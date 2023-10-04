import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";

const LOGIN_URL = "/api/v1/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response.data?.accessToken;
      const roles = response.data?.roles;
      setAuth(username, password, roles, accessToken);
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSumit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign in</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          {/* put a router link here */}
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
