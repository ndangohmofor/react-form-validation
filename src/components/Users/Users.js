import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const effectRan = useRef(false);

  // const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  let isMounted = true;
  const controller = new AbortController();

  const getAllUsers = () => {
    return axiosPrivate.get("/api/v1/admin/allusers", {
      signal: controller.signal,
    });
  };

  const { data: users, isLoading } = useQuery(["allUsers"], getAllUsers, {
    onError: (error) => {
      console.log(error);
      navigate("/login", { state: { from: location }, replace: true });
    },
    onSuccess: () => {
      isMounted = false;
      controller.abort();
      effectRan.current = true;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <article>
      <h2>Users List</h2>
      {users?.data.length ? (
        <ul>
          {users.data.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
