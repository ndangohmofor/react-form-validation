import React from "react";
import { Navbar, Nav, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer expand="lg" className="bg-body-tertiary footer">
        <Container>
          <Row>
            <Col className="justify-content-right" md={4}>
              <div className="d-flex align-items-left mb-3">
                <img
                  id="footer_logo"
                  alt="Workout Planner Logo"
                  src="images/Logo.png"
                  width={"40"}
                  height={"40"}
                  className="me-2"
                />{" "}
                <h5 className="footer">WorkoutPlanner</h5>
              </div>
              <p className="footer-paragraph">
                WorkoutPlanner is a leader in establishing healthy routines and
                lifestyles for our members.
              </p>
            </Col>
            <Col md={2} className="justify-content-center">
              <h5 className="footer">Our Offerings</h5>
              <ul className="list-unstyled footer">
                <li>
                  <a href="#!">Pool</a>
                </li>
                <li>
                  <a href="#!">Pilates</a>
                </li>
                <li>
                  <a href="#!">Yoga</a>
                </li>
              </ul>
            </Col>
            <Col className="justify-content-right">
              <h5 className="footer">Useful Links</h5>
              <ul className="list-unstyled footer">
                <li>
                  <a href="#!">Upcoming Classes</a>
                </li>
                <li>
                  <a href="#!">Workout Resources</a>
                </li>
                <li>
                  <a href="#!">Talk To An Instructor</a>
                </li>
              </ul>
            </Col>
            <Col md={3} className="justify-content-right">
              <h5 className="footer">Contact Us</h5>
              <p>
                123 S Main St
                <br />
                New York, NY 10012, US
                <br />
                Tel: (123) 456 7890
              </p>
            </Col>
            <Col className="justify-content-center">
              <h5 className="footer">Follow Us</h5>
              <ul className="list-unstyled my-0 footer">
                <li>
                  <a href="#!">
                    <FontAwesomeIcon icon={faFacebook} /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <FontAwesomeIcon icon={faTwitter} /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="text-center bg-primary">
        <Container>
          <p className="my-0 footer-copyright">
            &copy; {new Date().getFullYear()} Workout Planner
          </p>
        </Container>
      </div>
    </>
  );
};

export default Footer;
