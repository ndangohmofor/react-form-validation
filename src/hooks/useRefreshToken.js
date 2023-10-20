import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = (props) => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/v1/refreshtoken", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log("Previous", JSON.stringify(prev));
      console.log("New", response.data.body.access_token);
      return { ...prev, accessToken: response.data.body.access_token };
    });
    return response.data.body.access_token;
  };
  return refresh;
};

export default useRefreshToken;
