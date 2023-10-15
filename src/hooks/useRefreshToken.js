import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = (props) => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/v1/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.jwt);
      return { ...prev, jwt: response.data.jwt };
    });
    return response.data.jwt;
  };
  return refresh;
};

export default useRefreshToken;
