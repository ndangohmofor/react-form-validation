import React, { useState } from "react";

const UpdateProfileGoals = () => {
  // State for storing the user's goals
  const [goals, setGoals] = useState("");

  // Function to handle goal updates
  const handleGoalUpdate = (event) => {
    setGoals(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add logic to update the user's goals
    console.log("Updated goals:", goals);
  };

  return (
    <div>
      <h2>Update Goals</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Goals:
          <input type="text" value={goals} onChange={handleGoalUpdate} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfileGoals;
