import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold mb-2">Create Account</h1>
        <div className="card bg-base-100 w-96 shadow-2xl">
          <div className="card-body gap-4">
            <div className="flex gap-3">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="John"
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-primary w-full">Sign Up</button>
            </div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
