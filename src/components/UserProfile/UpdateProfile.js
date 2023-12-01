import React, { useState } from "react";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";

const UpdateProfile = () => {
  const { userProfileDetails } = useUserProfileDetails();
  // State variables for first name and last name
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

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
        <label>
          First Name:
          <input
            type="text"
            value={userProfileDetails.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        {userProfileDetails.middleName && (
          <label>
            First Name:
            <input
              type="text"
              value={userProfileDetails.middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </label>
        )}
        <label>
          Last Name:
          <input
            type="text"
            value={userProfileDetails.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
