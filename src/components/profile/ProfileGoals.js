import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const ProfileGoals = ({ goal }) => {
  const [updatedGoal, setUpdatedGoal] = useState(goal);

  const handleGoalUpdate = () => {
    // Logic to update the goal goes here
    // set a new workout goal
  };

  return (
    <Card style={{ width: "18rem", margin: 32 }}>
      <Card.Header>Goal</Card.Header>
      <Card.Body>
        {goal}
        <br />
        <Button
          variant="secondary"
          size="sm"
          className="float-end"
          onClick={handleGoalUpdate}
        >
          Update Goal
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileGoals;
