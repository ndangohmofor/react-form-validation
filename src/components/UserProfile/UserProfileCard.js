import React, { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfileCard = () => {
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

  let imageUrl;

  console.log(userProfileDetails);

  return (
    <div className="userprofile">
      {!isLoading ? (
        <div className="gradiant">
          <div className="profile-top">
            <img
              src={`data:image/jpeg;base64,${userProfileDetails.profilePhoto}`}
              alt="user profile image"
              height={100}
              width={100}
            />
            <div className="profile-name">
              {userProfileDetails.preferredName}
            </div>
            <div className="profile-name">
              {userProfileDetails.lastName}, {userProfileDetails.firstName}
            </div>
          </div>
        </div>
      ) : (
        <div>{/* display a skeleton loader here */}</div>
      )}
    </div>
  );
};

export default UserProfileCard;
