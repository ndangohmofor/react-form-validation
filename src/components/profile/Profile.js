import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./profile.css";

function Profile({
  profilePhoto,
  firstName,
  middleName,
  lastName,
  preferredName,
  goal,
}) {
  return (
    <Card style={{ width: "18rem", margin: 32 }}>
      <Card.Header as="h6">User Details</Card.Header>
      <Card.Body>
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
        <br />
        <Button variant="secondary" size="sm" className="float-end">
          Update Name
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Profile;
