import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("peter@gmail.com");
  const [password, setPassword] = useState("Peter@12");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold mb-2">Login now!</h1>
        <div className="card bg-base-100 w-96 shadow-2xl">
          <div className="card-body gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                value={email}
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <label className="label">
                <a className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="form-control mt-2">
              <button className="btn btn-primary w-full" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
