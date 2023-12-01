import React, { useState } from "react";

const UserDetailsContext = React.createContext({});

export const UserDetailsProvider = ({ children }) => {
  const [userProfileDetails, setUserProfileDetails] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    goal: "",
    profilePhoto: null,
  });

  return (
    <UserDetailsContext.Provider
      value={{ userProfileDetails, setUserProfileDetails }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsContext;
