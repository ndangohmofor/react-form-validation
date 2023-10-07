import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../hooks/useAuth";

const NavigationBar = () => {
  const { auth } = useAuth();
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Nav>
        <img
          alt="Workout Planner Logo"
          src="images/Logo.png"
          width={"80"}
          height={"80"}
          className="d-inline-block align-left"
        />{" "}
      </Nav>
      <Container>
        <Navbar.Brand href="#home">Workout Planner</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            {auth.user?.checkedIn ? (
              <Nav.Link href="/checkout">Check Out</Nav.Link>
            ) : (
              <Nav.Link href="/checkin">Check In</Nav.Link>
            )}
            <Nav.Link href="/machineguides">Machine Guides</Nav.Link>
            <Nav.Link href="/workoutmetrics">Workout Metrics</Nav.Link>
            <Nav.Link href="/reservedclasses">Reserved Classes</Nav.Link>
          </Nav>
          <Nav>
            {auth.user ? (
              <span>{auth.user?.firstName}</span>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
