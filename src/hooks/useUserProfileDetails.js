import { useContext } from "react";
import UserDetailsContext from "../context/UserDetailsProvider";

const useUserProfileDetails = () => {
  return useContext(UserDetailsContext);
};

export default useUserProfileDetails;
