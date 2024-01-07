import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Checkin = () => {
  const { setAuth, auth } = useAuth();
  const [checkin, setCheckin] = useState(false);
  const axios = useAxiosPrivate();
  const handleCheckin = async () => {
    const response = await axios.post("/api/v1/checkins/usercheckin");
    if (response.status === 200) {
      setCheckin(true);
    }
  };

  useEffect(() => {
    setAuth({
      ...auth,
      checkedIn: checkin,
    });
  }, [checkin, auth, setAuth]);

  return (
    <div className="row">
      {auth.checkedIn ? (
        <Card style={{ width: "80vw" }}>
          <Card.Header>Check out</Card.Header>
          <Card.Body>
            <Card.Title>Checkout to end workout sessioin</Card.Title>
            <Card.Text>Click the button to Check out</Card.Text>
            <Button onClick={handleCheckin} variant="primary" size="sm">
              Checkout
            </Button>
          </Card.Body>
        </Card>
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
