import React from "react";
import { Navbar } from "react-bootstrap";
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

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" sticky="top" bg="primary" data-bs-theme="dark">
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
      <Navbar.Brand as={Link} to="#home">
        Workout Planner
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
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
        </Nav>

        {auth.username ? (
          <>
            <Nav className="justify-content-center">
              {auth.user?.checkedIn ? (
                <Nav.Link as={Link} to="/checkout">
                  Check Out
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/checkin">
                  Check In
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/workoutmetrics">
                Workout Metrics
              </Nav.Link>
              <Nav.Link as={Link} to="/reservedclasses">
                Reserved Classes
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <>
                <Nav.Link as={Link} to="/profile">
                  {auth.username}
                </Nav.Link>
                <Nav.Link onClick={signOut}>Logout</Nav.Link>
              </>
            </Nav>
          </>
        ) : (
          <Nav>
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
