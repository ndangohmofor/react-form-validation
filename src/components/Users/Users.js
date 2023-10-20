import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const Users = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controler = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/api/v1/admin/allusers", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          signal: controler.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controler.abort();
    };
  }, [auth.accessToken]);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
      <br />
    </article>
  );
};

export default Users;
