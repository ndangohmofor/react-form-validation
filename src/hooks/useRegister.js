import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";

//Constants
const REGISTER_URL = "/api/v1/registration";

const registerUser = (user) => {
  return axios.post(
    REGISTER_URL,
    JSON.stringify({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    }
  );
};

export const useUserRegistration = () => {
  return useMutation(registerUser);
};
