import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import "tailwindcss/tailwind.css";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;

export const Register = () => {
  const userRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();
  const errRef = useRef();
  const REGISTER_URL = "https://gymfitapi.azurewebsites.net/api/Register";

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidUsername(result);
  }, [username]);

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
  }, [username, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(email, pwd);

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name: username, email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl mb-4">Success!</h1>
          <p>
            <Link to="/login" className="text-blue-500 underline">
              Sign In
            </Link>
          </p>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <section className="w-full max-w-md p-6">
            <p
              ref={errRef}
              className={`${errMsg ? "text-red-600 font-bold" : "hidden"} mb-4`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="text-2xl mb-4 text-center">Register</h1>
            <form
              className="w-full max-w-sm border-2 border-black rounded-lg p-4"
              onSubmit={handleSubmit}
            >
              <label htmlFor="username" className="block mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />

              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />

              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                ref={pwdRef}
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />

              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                ref={matchPwdRef}
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />

              <button
                disabled={!validEmail || !validPwd || !validMatch}
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center">
              Already registered? <br />
              <Link to="/login" className="text-blue-500 underline">
                Sign In
              </Link>
            </p>
          </section>
        </div>
      )}
    </>
  );
};
