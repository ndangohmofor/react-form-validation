import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserRegistration } from "../../hooks/useRegister";
import { Link } from "react-router-dom";
import "./Register.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    data: response,
    mutateAsync: registerUser,
    isSuccess,
  } = useUserRegistration();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if the button is enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      registerUser({
        username,
        password: pwd,
        firstName,
        lastName,
        email,
      });
      if (isSuccess) {
        setSuccess(true);
      }
      //clear the input fields out in the registration form
    } catch (err) {
      if (!err?.resposne) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {isSuccess ? (
        <section>
          <h1>{response.data}</h1>
          <p>
            <Link to={"/login"}>Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="register-heading">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                {/** Label for First name */}
                <label className="mt-0" htmlFor="firstName">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  autoComplete="on"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                  aria-invalid={!!firstName ? "false" : "true"}
                  aria-describedby="firstnamenote"
                  onFocus={() => setFirstNameFocus(true)}
                  onBlur={() => setFirstNameFocus(false)}
                />
                <p
                  id="firstnamenote"
                  className={
                    !firstNameFocus || (firstNameFocus && !!firstName)
                      ? "offscreen"
                      : "instructions"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Please enter your first name <br />
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                {/** Label for Last name */}
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  autoComplete="on"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  aria-invalid={!!lastName ? "false" : "true"}
                  aria-describedby="lastnamenote"
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                />
                <p
                  id="lastnamenote"
                  className={
                    !lastNameFocus || (lastNameFocus && !!lastName)
                      ? "offscreen"
                      : "instructions"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Please enter your last name <br />
                </p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                {/** Label for Email */}
                <label htmlFor="email">
                  Email:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Enter a valid email address. <br />
                  A valid email address will have a username, an '@' symbol, and
                  a domain name ending starting with "."
                  <br />
                  Example: "someusername@somedomain.com"
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                {/** Label for Username */}
                <label htmlFor="username">
                  Username:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !username ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="username"
                  ref={usernameRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && username && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                {/** Label for Password */}

                <label htmlFor="password">
                  Password:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation-mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                {/** Label for Confirm Password */}

                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <span
                    className={validMatchPwd && matchPwd ? "valid" : "hide"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMatchPwd || !matchPwd ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatchPwd ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchPwdFocus(true)}
                  onBlur={() => setMatchPwdFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchPwdFocus && !validMatchPwd
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <button
                  disabled={
                    !validName || !validPwd || !validMatchPwd ? true : false
                  }
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <p className="already-registered">
            Already registered?
            <br />
            <span className="line">
              {/** put a router link here */}
              <Link to={"/login"}>Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
