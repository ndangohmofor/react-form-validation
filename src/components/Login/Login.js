import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/api/v1/login";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
        JSON.stringify({ username, password })
      );
      const accessToken = response.data?.access_token;
      const role = response.data?.role;
      const checkedIn = response.data?.checkedIn;
      setAuth({ username, role, accessToken, checkedIn });
      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
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

  const togglePersist = (e) => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="column">
      <section className="login-form">
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
          <hr />
          <button>Sign in</button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">True This Device</label>
          </div>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/* put a router link here */}
            <Link className="line" to="/register">
              Sign Up
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
