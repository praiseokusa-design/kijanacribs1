import React, { useState } from "react";
import API from "../services/api";
import "../App.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/signin", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      window.location.href = "/";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-left">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt=""
        className="avatar"
      />

      <form onSubmit={login}>
        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <div className="mb-3">
          <input type="checkbox" /> Remember me
        </div>

        <button className="auth-btn btn-login">Log In</button>
        <p className="text-center mt-3">
            Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;