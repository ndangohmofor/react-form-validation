import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap/Button";

const ProfilePhoto = ({ profilePhoto, preferredName }) => {
  return (
    <Card style={{ width: "18rem" }} variant="top">
      <Card.Img variant="top" src={`data:image/jpeg;base64,${profilePhoto}`} />
      <Card.Header as="h6">{preferredName}</Card.Header>
      <Button variant="primary">Edit Profile</Button>
    </Card>
  );
};

export default ProfilePhoto;
