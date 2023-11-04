import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/v1/refreshtoken", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify("prevstate: ", prev));
      console.log("response body", response.data.body);
      return {
        ...prev,
        role: response.data.body.role,
        username: response.data.body.username,
        accessToken: response.data.body.access_token,
      };
    });
    console.log("auth: ", auth);
    return response.data.body.access_token;
  };
  return refresh;
};

export default useRefreshToken;
