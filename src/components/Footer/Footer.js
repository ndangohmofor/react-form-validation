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
    <footer>
      <div className="text-center bg-secondary footer-copyright">
        <Container>
          {/* <p className="my-0 footer-copyright"> */}
          <img
            id="footer_logo"
            alt="Workout Planner Logo"
            src="images/Logo.png"
            width={"30"}
            height={"30"}
            className="my-2"
          />{" "}
          {/* </div> */}
          {/* </Col>
            <Col className="justify-content-center"> */}
          <a href="#!" className="mx-1 footer-link">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#!" className="mx-1 footer-link">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#!" className="mx-1 footer-link">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          &copy; {new Date().getFullYear()} Workout Planner
          {/* </p> */}
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
