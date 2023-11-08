import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropDown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
import "./NavigationBar.css";
import useLogout from "../../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";

const NavigationBar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [expanded, setExpanded] = useState(false);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="primary"
      data-bs-theme="dark"
      expanded={expanded}
    >
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
      {/* <Navbar.Brand as={Link} to="#home">
        Workout Planner
      </Navbar.Brand> */}

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/"}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={"/about"}>
            About
          </Nav.Link>
          <NavDropDown title="Services" id="basic-nav-dropdown">
            <NavDropDown.Item as={Link} to={"/machineguides"}>
              Machine Guides
            </NavDropDown.Item>
            <NavDropDown.Item as={Link} to={"/workoutmetrics"}>
              Workout Metrics
            </NavDropDown.Item>
            <NavDropDown.Item as={Link} to={"/reservedclasses"}>
              Reserved Classes
            </NavDropDown.Item>
          </NavDropDown>
        </Nav>

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/machineguides">
            Machine Guides
          </Nav.Link>
        </Nav> */}

        {auth.username ? (
          <Nav>
            <NavDropDown title={auth.username} id="basic-nav-dropdown">
              {auth.user?.checkedIn ? (
                <NavDropDown.Item as={Link} to={"/checkout"}>
                  Checkout
                </NavDropDown.Item>
              ) : (
                <NavDropDown.Item as={Link} to={"checkin"}>
                  Checkin
                </NavDropDown.Item>
              )}
              <NavDropDown.Item as={Link} to={"/profile"}>
                Profile
              </NavDropDown.Item>
              <NavDropDown.Divider />
              <NavDropDown.Item
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
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
