import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:2000/login", {
        username: credential,
        pwd: password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error) {
        toast("User not found", {
          icon: "❌",
          position: "top-right",
        });
      }
    }
  };
  return (
    <div className="login-component">
      <section className="image-section">
        <div>
          <img src="../../../assets/login.jpg" alt="" />
        </div>
      </section>
      <section className="login-form">
        <form onSubmit={handleSubmit}>
          <span>Welcome Back 👋</span>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={credential}
              placeholder="Example@gmail.com"
              onChange={(e) => setCredential(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="At least 8 characters"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forget-pwd">
            <a href="">Forget Password?</a>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          <div>
            <p>
              Don't have an account? <a href="">Sign Up</a>
            </p>
          </div>
        </form>
      </section>
      <section>
        <span className="copyright">© 2023 ALL RIGHTS RESERVED</span>
      </section>
    </div>
  );
};

export default Login;
