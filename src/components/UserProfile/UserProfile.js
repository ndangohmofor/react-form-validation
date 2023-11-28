import React, { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import ProfileGoals from "../profile/ProfileGoals";

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
    <>
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
                <Button variant="secondary" size="sm" className="float-end">
                  Edit Photo
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col>
                <Profile {...userProfileDetails} />
              </Col>
              <Col>
                <ProfileGoals {...userProfileDetails} />
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <div>{/* display a skeleton loader here */}</div>
      )}
    </>
  );
};

export default UserProfile;
