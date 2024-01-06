import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Checkin = () => {
  return (
    <div className="row">
      <Card style={{ width: "80vw" }}>
        <Card.Header>Check in</Card.Header>
        <Card.Body>
          <Card.Title>Check in to your workout session</Card.Title>
          <Card.Text>
            You are not currently Checked into a workout session. Click the
            button to Check in
          </Card.Text>
          <Button variant="primary" size="sm">
            Checkin
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Checkin;
