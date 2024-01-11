import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Checkin = () => {
  const { setAuth, auth } = useAuth();
  const [checkin, setCheckin] = useState(auth.checkedIn ? true : false);
  const [firstCheckinDate, setFirstCheckinDate] = useState();
  const axios = useAxiosPrivate();

  const controller = new AbortController();

  //TODO: Update the API calls here to use React useQuery hook. We may want to try useQueries when we add calls for the workout statitics
  const handleCheckin = async () => {
    const response = await axios.post("/api/v1/checkins/usercheckin", {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    const firstLoginResponse = await axios.get(
      "/api/v1/checkins/firstcheckin",
      {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      }
    );
    if (response.status === 200) {
      setCheckin(true);
    }
    if (firstLoginResponse.status === 200) {
      setFirstCheckinDate(firstLoginResponse.data);
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
              <Card.Title>Time Since Last Visit:</Card.Title>
              <Card.Text>{"??"} Year(s)</Card.Text>
              <Card.Text>{"??"} Months(s)</Card.Text>
              <Card.Text>{"??"} Days(s)</Card.Text>
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
