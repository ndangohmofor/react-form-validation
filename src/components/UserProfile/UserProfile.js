import React, { useEffect, useRef } from "react";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CardSkeleton from "../skeleton/CardSkeleton";

const UserProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userProfileDetails, setUserProfileDetails } = useUserProfileDetails();
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
      console.log(userProfile.data);
      setUserProfileDetails(userProfile.data);
    }
  }, [userProfileDetails, userProfile, isFetched]);

  return (
    <div>
      <h1 className="text-center">User Profile</h1>
      {!isLoading ? (
        <Row>
          <Col>
            <Card style={{ width: "18rem", margin: 32 }} variant="top">
              <Card.Img
                variant="top"
                src={
                  userProfileDetails.profilePhoto
                    ? userProfileDetails.profilePhoto.startsWith("data:image")
                      ? userProfileDetails.profilePhoto
                      : `data:image/jpeg;base64,${userProfileDetails.profilePhoto}`
                    : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1701696541~exp=1701697141~hmac=3da83f836ef4bde005012f6614e9296da82da2a7ef9a9f0e331ada9f23ecd177"
                }
                alt="profile photo"
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
                      <Link
                        to={`/updateprofile/${userProfileDetails.username}`}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="float-end"
                        >
                          Update Profile
                        </Button>
                      </Link>
                    </Card.Header>
                  </Card>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      ) : (
        // Add a skeleton loader here
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
          <CardSkeleton />
        </SkeletonTheme>
      )}
    </div>
  );
};

export default UserProfile;
