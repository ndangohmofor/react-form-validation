import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropDown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
import "./NavigationBar.css";
import useLogout from "../../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const NavigationBar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [expanded, setExpanded] = useState(false);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = (
    <>
      <Nav.Link as={Link} to={"/home"}>
        Home
      </Nav.Link>
      <Nav.Link as={Link} to={"/about"}>
        About
      </Nav.Link>
      <Nav.Link as={Link} to={"/machineguides"}>
        Machine Guides
      </Nav.Link>
      <Nav.Link as={Link} to={"/workoutmetrics"}>
        Workout Metrics
      </Nav.Link>
      <Nav.Link as={Link} to={"/reservedclasses"}>
        Classes
      </Nav.Link>
    </>
  );

  return (
    <Navbar
      expand="sm"
      sticky="top"
      bg="primary"
      data-bs-theme="dark"
      className="bg-body-primary mb-3"
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            id="logo"
            alt="Workout Planner Logo"
            src="images/Logo.png"
            width={"50"}
            height={"50"}
            className="d-inline-block align-left"
          />
          Workout Planner
        </Navbar.Brand>

        {/* Custom button for mobile view */}
        <Button
          className="ms-auto d-sm-none"
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          Menu
        </Button>

        {/* Nav items for larger screens */}
        <Navbar.Collapse id="basic-navbar-nav" className="d-sm-none">
          <Nav className="me-auto">{navLinks}</Nav>
        </Navbar.Collapse>

        {/* Offcanvas for mobile view */}
        <Navbar.Offcanvas
          id="basic-navbar-nav"
          placement="end"
          show={expanded}
          onHide={() => setExpanded(false)}
          className="d-sm-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbar-expand-sm">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              {navLinks}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
