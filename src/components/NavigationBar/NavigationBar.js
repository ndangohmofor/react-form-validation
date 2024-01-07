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
      <Nav.Link
        className="nav-link-white"
        as={Link}
        to={"/home"}
        onClick={() => setExpanded(false)}
      >
        Home
      </Nav.Link>
      <br />
      <Nav.Link
        className="nav-link-white"
        as={Link}
        to={"/about"}
        onClick={() => setExpanded(false)}
      >
        About
      </Nav.Link>
      <br />
      <Nav.Link
        className="nav-link-white"
        as={Link}
        to={"/machineguides"}
        onClick={() => setExpanded(false)}
      >
        Machine Guides
      </Nav.Link>
      <br />
      <Nav.Link
        className="nav-link-white"
        as={Link}
        to={"/workoutmetrics"}
        onClick={() => setExpanded(false)}
      >
        Workout Metrics
      </Nav.Link>
      <br />
      <Nav.Link
        className="nav-link-white"
        as={Link}
        to={"/reservedclasses"}
        onClick={() => setExpanded(false)}
      >
        Classes
      </Nav.Link>
      <br />
    </>
  );

  const loginLinks = auth.username ? (
    <Nav>
      <NavDropDown title={auth.username} id="basic-nav-dropdown">
        {auth.user?.checkedin ? (
          <>
            <NavDropDown.Item
              className="nav-link-black"
              as={Link}
              to={"/checkout"}
              onClick={() => setExpanded(false)}
            >
              Checkout
            </NavDropDown.Item>
          </>
        ) : (
          <>
            <NavDropDown.Item
              className="nav-link-black"
              as={Link}
              to={"checkin"}
              onClick={() => setExpanded(false)}
            >
              Checkin
            </NavDropDown.Item>
          </>
        )}
        <NavDropDown.Item
          className="nav-link-black"
          as={Link}
          to={"/profile"}
          onClick={() => setExpanded(false)}
        >
          Profile
        </NavDropDown.Item>
        <NavDropDown.Divider />
        <NavDropDown.Item
          className="nav-link-black"
          onClick={() => {
            signOut();
            setExpanded(false);
          }}
        >
          Logout
        </NavDropDown.Item>
      </NavDropDown>
    </Nav>
  ) : (
    <Nav>
      <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>
        Register
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar
      expand="sm"
      sticky="top"
      data-bs-theme="dark"
      className="bg-body-purple"
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
          variant="outline-light"
          size="sm"
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
            <Nav className="flex-column align-items-start justify-content-center flex-grow-1 pe-3">
              <>
                <Nav.Link
                  className="nav-link-black"
                  as={Link}
                  to={"/home"}
                  onClick={() => setExpanded(false)}
                >
                  Home
                </Nav.Link>
                <br />
                <Nav.Link
                  className="nav-link-black"
                  as={Link}
                  to={"/about"}
                  onClick={() => setExpanded(false)}
                >
                  About
                </Nav.Link>
                <br />
                <Nav.Link
                  className="nav-link-black"
                  as={Link}
                  to={"/machineguides"}
                  onClick={() => setExpanded(false)}
                >
                  Machine Guides
                </Nav.Link>
                <br />
                <Nav.Link
                  className="nav-link-black"
                  as={Link}
                  to={"/workoutmetrics"}
                  onClick={() => setExpanded(false)}
                >
                  Workout Metrics
                </Nav.Link>
                <br />
                <Nav.Link
                  className="nav-link-black"
                  as={Link}
                  to={"/reservedclasses"}
                  onClick={() => setExpanded(false)}
                >
                  Classes
                </Nav.Link>
                <br />
              </>
            </Nav>
            {loginLinks}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
