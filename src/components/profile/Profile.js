import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Profile({
  profilePhoto,
  firstName,
  middleName,
  lastName,
  preferredName,
  goal,
}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`data:image/jpeg;base64,${profilePhoto}`} />
      <Card.Header as="h6">User Profile</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>Preferred Name:</Card.Text>
          </Col>
          <Col>
            <Card.Text>{preferredName}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>First Name:</Card.Text>
          </Col>
          <Col>
            <Card.Text>{firstName}</Card.Text>
          </Col>
        </Row>
        {middleName && (
          <Row>
            <Col>
              <Card.Text>Middle Name:</Card.Text>
            </Col>
            <Col>
              <Card.Text>{middleName}</Card.Text>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Card.Text>Last Name:</Card.Text>
          </Col>
          <Col>
            <Card.Text>{lastName}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>Workout Goal</Card.Text>
          </Col>
          <Col>
            <Card.Text>{goal}</Card.Text>
          </Col>
        </Row>
        <br />
        <Button variant="secondary" size="sm">
          Update Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Profile;
