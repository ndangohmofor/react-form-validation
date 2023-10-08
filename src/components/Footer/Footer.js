import React from "react";
import { Navbar, Nav, Row, Col, Container } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary footer" sticky="bottom">
        <Container>
          <Row>
            <Col className="justify-content-right">
              <Navbar.Brand href="/">
                <img
                  id="footer_logo"
                  alt="Workout Planner Logo"
                  src="images/Logo.png"
                  width={"40"}
                  height={"40"}
                />{" "}
                WorkoutPlanner
              </Navbar.Brand>
              <p className="footer-paragraph">
                WorkoutPlanner is a leader in establishing healthy routines and
                lifestyles for our members.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="justify-content-center">
              <Navbar.Text href="/">Offerings</Navbar.Text>
              <Nav.Link>Pool</Nav.Link>
              <Nav.Link>Pilates</Nav.Link>
              <Nav.Link>Yoga</Nav.Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="justify-content-right">
              <Navbar.Text href="/">Useful Links</Navbar.Text>
              <Nav.Link>Upcoming Classes</Nav.Link>
              <Nav.Link>Workout Resources</Nav.Link>
              <Nav.Link>Your account</Nav.Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="justify-content-center">
              <Navbar.Text href="/">Help</Navbar.Text>
              <Nav.Link>Office hours</Nav.Link>
              <Nav.Link>Member Benefits</Nav.Link>
              <Nav.Link>Careers</Nav.Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="justify-content-right">
              <Navbar.Text href="/">Contacts</Navbar.Text>
              <Nav.Link>123 S Main St</Nav.Link>
              <Nav.Link>New York, NY 10012, US</Nav.Link>
              <Nav.Link>(123) 456 7890</Nav.Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
