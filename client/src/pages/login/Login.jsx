import React, { useState } from "react";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(username, password);
      const pwd = "qwerty12345678";
      const reg_no = "C026-01-0676/2020";
      const response = await axios.post("http://localhost:2000/login", {
        reg_no,
        pwd,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
              value={username}
              placeholder="Example@gmail.com"
              onChange={(e) => setUsername(e.target.value)}
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
