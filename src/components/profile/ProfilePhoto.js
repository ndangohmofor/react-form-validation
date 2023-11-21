import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const ProfilePhoto = ({ profilePhoto, preferredName }) => {
  return (
    <Card style={{ width: "18rem", margin: 32 }} variant="top">
      <Card.Img variant="top" src={`data:image/jpeg;base64,${profilePhoto}`} />
      <Card.Body>
        <Card.Title>Preferred Name</Card.Title>
        <Card.Header as="h4">{preferredName}</Card.Header>
        <br />
        <Button variant="secondary" size="sm" className="float-end">
          Edit Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfilePhoto;
