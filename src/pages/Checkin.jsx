import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const dateDiff = (oldDateRaw) => {
  if (oldDateRaw) {
    const oldDate = new Date(oldDateRaw);
    let ynew = new Date().getFullYear();
    let mnew = new Date().getMonth();
    let dnew = new Date().getDate();
    let yold = oldDate.getFullYear();
    let mold = oldDate.getMonth();
    let dold = oldDate.getDate();

    let diffYears = ynew - yold;
    let diffMonths = mnew - mold;
    let diffDays = dnew - dold;

    if (diffMonths < 0) {
      diffYears--;
      diffMonths += 12;
    }

    if (diffDays < 0) {
      diffMonths--;
      let lastDayOfPrevMonth = new Date(ynew, mnew, 0).getDate();
      diffDays += lastDayOfPrevMonth;
    }

    return {
      years: diffYears,
      months: diffMonths,
      days: diffDays,
    };
  }
  return null;
};

const convertSecondsToHMS = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  return { hours, minutes, seconds };
};

const Checkin = () => {
  const { setAuth, auth } = useAuth();
  const [checkin, setCheckin] = useState(auth.checkedIn ? true : false);
  const [lastWorkoutDate, setLastWorkoutDate] = useState();
  const [avgTotalworkout, setAvgTotalWorkout] = useState();
  const [totalSessionworkout, setTotalSessionWorkout] = useState();
  const [sessionWorkout, setSessionWorkout] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hms, setHms] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timeSinceLastVisit, setTimeSinceLastVisit] = useState({
    years: 0,
    months: 0,
    days: 0,
  });
  const axios = useAxiosPrivate();

  const controller = new AbortController();

  //TODO: Update the API calls here to use React useQuery hook. We may want to try useQueries when we add calls for the workout statitics
  const handleCheckin = async () => {
    const response = await axios.post("/api/v1/checkins/usercheckin", {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    const lastWorkoutResponse = await axios.get(
      "/api/v1/checkins/lastworkoutdate",
      {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      }
    );
    if (response.status === 200) {
      setCheckin(true);
    }
    if (lastWorkoutResponse.status === 200) {
      setLastWorkoutDate(lastWorkoutResponse.data);
    }
  };

  const handleCheckout = async () => {
    const response = await axios.post("/api/v1/checkins/usercheckout", {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    const sessionWorkoutResponse = await axios.get(
      "/api/v1/checkins/totalSessionWorkout",
      {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      }
    );
    if (response.status === 200) {
      setCheckin(false);
    }
    if (sessionWorkoutResponse.status === 200) {
      setTotalSessionWorkout(sessionWorkoutResponse.data);
    }
  };

  useEffect(() => {
    async function fetchAvgWorkout() {
      return await axios.get("/api/v1/checkins/totalWorkout", {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });
    }
    const avgWorkoutResponse = fetchAvgWorkout();
    if (avgWorkoutResponse.status === 200) {
      setAvgTotalWorkout(avgWorkoutResponse.data);
    }
  });

  useEffect(() => {
    setAuth({
      ...auth,
      checkedIn: checkin,
    });
  }, [checkin]);

  useEffect(() => {
    setTimeSinceLastVisit(dateDiff(lastWorkoutDate));
  }, [lastWorkoutDate]);

  useEffect(() => {
    setSessionWorkout(convertSecondsToHMS(totalSessionworkout));
  }, [totalSessionworkout]);

  return (
    <div className="row">
      {auth.checkedIn ? (
        <div>
          <Card style={{ width: "80vw" }}>
            <Card.Header>Check out</Card.Header>
            <Card.Body>
              <Card.Title>Checkout to end workout sessioin</Card.Title>
              {/* <Card.Text>Click the button to Check out</Card.Text> */}
              <Button onClick={handleCheckout} variant="primary" size="sm">
                Checkout
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "80vw" }}>
            <Card.Header>Visit Metrics</Card.Header>
            <Card.Body>
              {!!timeSinceLastVisit ? (
                <>
                  <Card.Title>Time Since Last Visit:</Card.Title>
                  <Card.Text>{`${timeSinceLastVisit.years} Year(s)`}</Card.Text>
                  <Card.Text>{`${timeSinceLastVisit.months} Month(s)`}</Card.Text>
                  <Card.Text>{`${timeSinceLastVisit.days} Day(s)`}</Card.Text>
                </>
              ) : (
                <>
                  <Card.Text>
                    Congratulations on starting your first workout
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Card style={{ width: "80vw" }}>
          <Card.Header>Check in</Card.Header>
          <Card.Body>
            <Card.Title>Check in to your workout session</Card.Title>
            <Card.Text>Click the button to Check in</Card.Text>
            <Button onClick={handleCheckin} variant="primary" size="sm">
              Checkin
            </Button>
          </Card.Body>
          <Card.Body>
            <Card.Title>Average Workout For This Session</Card.Title>
            <Card.Text>{`${sessionWorkout.hours} Hour(s)`}</Card.Text>
            <Card.Text>{`${sessionWorkout.minutes} Minute(s)`}</Card.Text>
            <Card.Text>{`${sessionWorkout.seconds} Second(s)`}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>Total Average Workout</Card.Title>
            <Card.Text>{`${hms.hours} Hour(s)`}</Card.Text>
            <Card.Text>{`${hms.minutes} Minute(s)`}</Card.Text>
            <Card.Text>{`${hms.seconds} Second(s)`}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Checkin;
