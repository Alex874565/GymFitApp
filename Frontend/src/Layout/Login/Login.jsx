import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LOGIN_URL = "/api/Login";

export const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data;
      const role = jwtDecode(response?.data).Role;

      localStorage.setItem("token", accessToken);

      setEmail("");
      setPwd("");

      console.log(response.status);

      if (response.status === 200) {
        navigate("/user");
      }

      console.log(role);

      if (role.includes("Client")) {
        navigate("/user", { replace: true });
      } else if (role.includes("Admin")) {
        navigate("/admin", { replace: true });
      } else if (role.includes("Trainer")) {
        navigate("/trainer", { replace: true });
      } else {
        navigate("/missing", { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <p
        ref={errRef}
        className={`${errMsg ? "text-red-600 font-bold mb-4" : "hidden"}`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-2xl mb-4">Sign In</h1>
      <form
        className="w-full max-w-sm border-2 border-black rounded-lg p-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          ref={userRef}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center">
        Need an Account? <br />
        <Link to="/register" className="text-blue-500 underline">
          Sign Up
        </Link>
      </p>
    </section>
  )
};
