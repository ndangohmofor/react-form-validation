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
        {/* <Navbar.Brand as={Link} to="#home">
        Workout Planner
      </Navbar.Brand> */}

        <Button
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          Menu
        </Button>

        <Navbar.Offcanvas
          id="basic-navbar-nav"
          aria-labelledby="basic-navbar-nav"
          placement="end"
          show={expanded}
          onHide={() => setExpanded(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbar-expand-sm">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link as={Link} to={"/home"}>
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        {/* <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
