import { useRef, useState, useEffect } from "react";
import "./Register.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { match } from "assert";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/Logo.png";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // @ts-ignore
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd); //doar in consola
    setSuccess(true); // doar in consola
    //aici se vor transmite datele catre backend
  };

  return (
    <div className="register-container">
      <section className="register-page">
        <p
          ref={userRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="register-heading">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="register-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="input-register"
          />
          <label htmlFor="password" className="register-label">
            Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(true)}
            className="input-register"
          />

          <label htmlFor="password" className="register-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(true)}
            className="input-register"
          />

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </button>
        </form>
        <p>
          Already registered? <br />
          <Link to="/login">Sign In</Link>
        </p>
      </section>
    </div>
  );
};
