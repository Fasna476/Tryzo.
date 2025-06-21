

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      
      localStorage.setItem("token", res.data.token);
      console.log("token is getting saved",res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userId",  res.data.user.id);
      const user = res.data.user;
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // Normal user goes to home
      }
      // navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
    
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <a href="/register" className="register-btn">Don't have an account? Register</a>
    </div>
  );
};

export default Login;
