import React, { useState } from "react";

const UpdateProfilePhoto = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement logic to update the user's profile photo and preferred name
    console.log("Photo:", photo);
    console.log("Name:", name);
  };

  return (
    <div>
      <h2>Update Profile Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="photo">Profile Photo:</label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
        </div>
        <div>
          <label htmlFor="name">Preferred Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfilePhoto;
