import React, { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const UserProfile = () => {
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const effectRan = useRef(false);

  let isMounted = true;
  const controller = new AbortController();

  const fetchUserProfile = () => {
    return axiosPrivate.get("/api/v1/profiles/profile", {
      signal: controller.signal,
    });
  };

  const {
    data: userProfile,
    isFetched,
    isLoading,
  } = useQuery(["fetchUserProfile"], fetchUserProfile, {
    onError: (error) => {
      console.log(error);
      navigate("/login", { state: { from: location }, replace: true });
    },
    onSuccess: () => {
      isMounted = false;
      controller.abort();
      effectRan.current = true;
    },
  });

  useEffect(() => {
    if (isFetched) {
      setUserProfileDetails(userProfile.data.body);
      console.log(userProfileDetails);
    }
  }, [isFetched]);

  return (
    <div>
      <h1 className="text-center">User Profile</h1>
      {!isLoading ? (
        <Row>
          <Col>
            <Card style={{ width: "18rem", margin: 32 }} variant="top">
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${userProfileDetails.profilePhoto}`}
              />
              <Card.Header as="h6">Preferred Name</Card.Header>
              <Card.Body>
                <Card.Title className="float-start">
                  {userProfileDetails.preferredName}
                </Card.Title>
                <br />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col>
                <Card style={{ width: "18rem", margin: 32 }}>
                  <Card.Header as="h6">User Details</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Text>First Name:</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{userProfileDetails.firstName}</Card.Text>
                      </Col>
                    </Row>
                    {userProfileDetails.middleName && (
                      <Row>
                        <Col>
                          <Card.Text>Middle Name:</Card.Text>
                        </Col>
                        <Col>
                          <Card.Text>{userProfileDetails.middleName}</Card.Text>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col>
                        <Card.Text>Last Name:</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{userProfileDetails.lastName}</Card.Text>
                      </Col>
                    </Row>
                    <br />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem", margin: 32 }}>
                  <Card.Header>Goal</Card.Header>
                  <Card.Body>
                    {userProfileDetails.goal}
                    <br />
                  </Card.Body>
                </Card>
              </Col>
              <Row>
                <Col>
                  <Card style={{ width: "8rem", margin: 32 }}>
                    <Card.Header style={{ margin: 0 }}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="float-end"
                        // onClick={handleGoalUpdate}
                      >
                        Update Profile
                      </Button>
                    </Card.Header>
                  </Card>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      ) : (
        // Add a skeleton loader here
        <>
          <Skeleton count={3} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
