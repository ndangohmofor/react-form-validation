import React, { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";
import ProfilePhoto from "../profile/ProfilePhoto";
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
    }
  }, [isFetched]);

  return (
    <>
      {!isLoading ? (
        <Row>
          <Col>
            <ProfilePhoto {...userProfileDetails} />
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
