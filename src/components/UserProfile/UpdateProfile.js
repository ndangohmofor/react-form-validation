import React, { useState } from "react";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";

const UpdateProfile = () => {
  const { userProfileDetails } = useUserProfileDetails();
  // State variables for first name and last name
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [goal, setGoal] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the update profile logic here
    console.log("Updating profile:", firstName, lastName);
    // Reset the form fields
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              Preferred Name:
              <input
                type="text"
                value={userProfileDetails.preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              First Name:
              <input
                type="text"
                value={userProfileDetails.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br />
        {userProfileDetails.middleName && (
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>
                Middle Name:
                <input
                  type="text"
                  value={userProfileDetails.middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </label>
            </div>
          </div>
        )}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              Last Name:
              <input
                type="text"
                value={userProfileDetails.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              Workout Goal:
              <input
                type="text"
                value={userProfileDetails.goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-group col-md-6">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
