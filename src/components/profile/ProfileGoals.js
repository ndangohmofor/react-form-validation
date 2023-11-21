import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProfileGoals = ({ goal }) => {
  const [updatedGoal, setUpdatedGoal] = useState(goal);

  const handleGoalUpdate = () => {
    // Logic to update the goal goes here
    // For now, let's just update the goal with a random number
    const randomGoal = Math.floor(Math.random() * 100);
    setUpdatedGoal(randomGoal);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Goal</Card.Title>
        <Card.Text>{updatedGoal}</Card.Text>
        <Button onClick={handleGoalUpdate}>Update Goal</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileGoals;
