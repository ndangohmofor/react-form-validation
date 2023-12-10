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
      <Nav.Link className="nav-link-black" as={Link} to={"/home"}>
        Home
      </Nav.Link>
      <br />
      <Nav.Link className="nav-link-black" as={Link} to={"/about"}>
        About
      </Nav.Link>
      <br />
      <Nav.Link className="nav-link-black" as={Link} to={"/machineguides"}>
        Machine Guides
      </Nav.Link>
      <br />
      <Nav.Link className="nav-link-black" as={Link} to={"/workoutmetrics"}>
        Workout Metrics
      </Nav.Link>
      <br />
      <Nav.Link className="nav-link-black" as={Link} to={"/reservedclasses"}>
        Classes
      </Nav.Link>
      <br />
    </>
  );

  const loginLinks = auth.username ? (
    <Nav>
      <NavDropDown title={auth.username} id="basic-nav-dropdown">
        {auth.user?.checkedIn ? (
          <>
            <NavDropDown.Item
              className="nav-link-black"
              as={Link}
              to={"/checkout"}
            >
              Checkout
            </NavDropDown.Item>
            <br />
          </>
        ) : (
          <>
            <NavDropDown.Item
              className="nav-link-black"
              as={Link}
              to={"checkin"}
            >
              Checkin
            </NavDropDown.Item>
            <br />
          </>
        )}
        <NavDropDown.Item className="nav-link-black" as={Link} to={"/profile"}>
          Profile
        </NavDropDown.Item>
        <NavDropDown.Divider />
        <NavDropDown.Item
          className="nav-link-black"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </NavDropDown.Item>
      </NavDropDown>
    </Nav>
  ) : (
    <Nav>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
    </Nav>
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
          <Nav className="me-auto justify-content-center">{navLinks}</Nav>
          <Nav className="justify-content-end">{loginLinks}</Nav>
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
            {loginLinks}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
