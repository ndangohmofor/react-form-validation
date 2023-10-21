import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const effectRan = useRef(false);

  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controler = new AbortController();

    if (effectRan.current === true) {
      const getUsers = async () => {
        try {
          const response = await axiosPrivate.get("/api/v1/admin/allusers", {
            signal: controler.signal,
          });
          isMounted && setUsers(response.data);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };

      getUsers();
    }
    return () => {
      isMounted = false;
      controler.abort();
      effectRan.current = true;
    };
  }, []);

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
      <br />
    </article>
  );
};

export default Users;
