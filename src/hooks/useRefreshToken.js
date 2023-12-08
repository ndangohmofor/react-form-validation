import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  //TODO: Update this hook to use react-query's useQuery hook so that it handles instances of multiple calls seamlessly.
  const refresh = async () => {
    const response = await axios.get("/api/v1/refreshtoken");
    setAuth((prev) => {
      return {
        ...prev,
        role: response.data.role,
        username: response.data.username,
        accessToken: response.data.access_token,
      };
    });
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
