import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Checkin = () => {
  const { setAuth, auth } = useAuth();
  const [checkin, setCheckin] = useState(auth.checkedIn ? true : false);
  const [lastWorkoutDate, setLastWorkoutDate] = useState();
  const axios = useAxiosPrivate();

  const controller = new AbortController();

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

      return { years: diffYears, months: diffMonths, days: diffDays };
    }
    return null;
  };

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
    if (response.status === 200) {
      setCheckin(false);
    }
  };

  useEffect(() => {
    setAuth({
      ...auth,
      checkedIn: checkin,
    });
  }, [checkin]);

  let timeSinceLastVisit;

  useEffect(() => {
    timeSinceLastVisit = dateDiff(lastWorkoutDate);
    console.log(lastWorkoutDate);
    console.log(timeSinceLastVisit);
  }, [lastWorkoutDate]);

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
                  <Card.Text>{"??"} Year(s)</Card.Text>
                  <Card.Text>{"??"} Months(s)</Card.Text>
                  <Card.Text>{"??"} Days(s)</Card.Text>
                </>
              ) : (
                <>
                  <Card.Text>
                    Congratulations on starting your first workout
                  </Card.Text>
                </>
              )}
            </Card.Body>
            <Card.Body>
              <Card.Title>Average Workout</Card.Title>
              <Card.Text>{"??"} Hour(s)</Card.Text>
              <Card.Text>{"??"} Minute(s)</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Card style={{ width: "80vw" }}>
          <Card.Header>Check in</Card.Header>
          <Card.Body>
            <Card.Title>Check in to your workout session</Card.Title>
            <Card.Text>
              You are not currently Checked into a workout session. Click the
              button to Check in
            </Card.Text>
            <Button onClick={handleCheckin} variant="primary" size="sm">
              Checkin
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Checkin;
