import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const ProfilePhoto = ({ profilePhoto, preferredName }) => {
  return (
    <Card style={{ width: "18rem", margin: 32 }} variant="top">
      <Card.Img variant="top" src={`data:image/jpeg;base64,${profilePhoto}`} />
      <Card.Header as="h6">Preferred Name</Card.Header>
      <Card.Body>
        <Card.Title className="float-start">{preferredName}</Card.Title>
        <br />
        <Button variant="secondary" size="sm" className="float-end">
          Edit Photo
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfilePhoto;
