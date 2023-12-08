import React, { useState } from "react";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

// Function to read uploaded file as base64 and set to state
const handleFileRead = (e) => {
  const file = e.target.files[0];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { userProfileDetails } = useUserProfileDetails();
  // State variables for first name and last name
  const [firstName, setFirstName] = useState(userProfileDetails.firstName);
  const [middleName, setMiddleName] = useState(userProfileDetails.middleName);
  const [lastName, setLastName] = useState(userProfileDetails.lastName);
  const [preferredName, setPreferredName] = useState(
    userProfileDetails.preferredName
  );
  const [goal, setGoal] = useState(userProfileDetails.goal);
  const [profilePhoto, setProfilePhoto] = useState(
    userProfileDetails.profilePhoto
      ? userProfileDetails.profilePhoto.startsWith("data:image/")
        ? userProfileDetails.profilePhoto
        : "data:image/jpeg;base64," + userProfileDetails.profilePhoto
      : ""
  );
  const [username, setUsername] = useState(userProfileDetails.username);

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  //Function to patch user profile details to the backend using axios patch request
  const patchUserProfile = async (fName, mName, lName, pName, goal, photo) => {
    const potentialUpdates = [
      fName && { op: "replace", path: "/firstName", value: fName },
      mName && { op: "replace", path: "/middleName", value: mName },
      lName && { op: "replace", path: "/lastName", value: lName },
      pName && { op: "replace", path: "/preferredName", value: pName },
      goal && { op: "replace", path: "/goal", value: goal },
      photo && {
        op: "replace",
        path: "/profilePhoto",
        value: photo.replace("data:", "").replace(/^.+,/, ""),
      },
    ];

    const userProfileDetails = potentialUpdates.filter(Boolean);

    const response = await axiosPrivate.patch(
      `/api/v1/profiles/profile/${username}/update`,
      userProfileDetails,
      {
        headers: { "Content-Type": "application/json-patch+json" },
        signal: controller.signal,
      }
    );
    return response;
  };

  const handleFileUpload = async (e) => {
    const base64Photo = await handleFileRead(e);
    setProfilePhoto(base64Photo);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    patchUserProfile(
      firstName,
      middleName,
      lastName,
      preferredName,
      goal,
      profilePhoto
    ).then((response) => {
      navigate("/profile");
    });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="profilePhoto">
              Profile Picture:
              <div className="row justify-content-center">
                <img src={profilePhoto} alt="profile" />
              </div>
              <br />
              <input type="file" onChange={(e) => handleFileUpload(e)} />
            </label>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              Preferred Name:
              <input
                type="text"
                value={preferredName ? preferredName : ""}
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
                value={firstName ? firstName : ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br />

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              Middle Name:
              <input
                type="text"
                value={middleName ? middleName : ""}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              Last Name:
              <input
                type="text"
                value={lastName ? lastName : ""}
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
                value={goal ? goal : ""}
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
