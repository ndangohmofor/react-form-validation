import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  // TODO: Update this hook to use useQuery

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/api/v1/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
