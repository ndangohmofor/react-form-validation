import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
import "./NavigationBar.css";

const NavigationBar = () => {
  const { auth } = useAuth();
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="primary"
      data-bs-theme="dark"
      // className="bg-body-tertiary"
    >
      <Nav>
        <img
          id="logo"
          alt="Workout Planner Logo"
          src="images/Logo.png"
          width={"50"}
          height={"50"}
          className="d-inline-block align-left"
        />
      </Nav>
      <Navbar.Brand href="#home">Workout Planner</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
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
        <Nav className="justify-content-end">
          {auth.user ? (
            <>
              <Navbar.Text>{auth.user?.firstName}</Navbar.Text>
              <Nav.Link href="/signout">Sign Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
