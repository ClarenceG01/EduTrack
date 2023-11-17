import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate, NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { successToast } from "../../utils/success_toast";
import { errorToast } from "../../utils/error_toast";

const Login = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios.post("http://localhost:2000/login", {
        username: credential,
        pwd: password,
      });
      const { is_pwd_changed } = response.data;
      if (response.data.message === "Login successful") {
        const { role } = decodeToken(response.data.cookies);
        if (role === "admin") {
          setTimeout(() => {
            successToast("Login successful");
          }, 5000);
          setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard");
          }, 10000);
        } else {
          setTimeout(() => {
            successToast("Login successful");
          }, 5000);
          setTimeout(() => {
            setIsLoading(false);
            if (is_pwd_changed === false) {
              navigate("/changepwd");
            } else {
              navigate("/home");
            }
          }, 10000);
        }
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setTimeout(() => {
          errorToast("Invalid credentials");
        }, 4000);
        setTimeout(() => {
          setIsLoading(false);
          setCredential("");
          setPassword("");
        }, 7000);
      }
    }
  };
  return (
    <div className="login-component">
      <section className="image-section">
        <img src="../../../assets/login.jpg" alt="" />
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
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forget-pwd">
            <a href="">Forget Password?</a>
          </div>
          <button className="login-btn" type="submit">
            {isLoading ? <BeatLoader color="#eaf3f1" /> : <span>Login</span>}
          </button>
          <div className="signup-link">
            <NavLink to="/signup">
              <div>Don't have an account? Sign Up</div>
            </NavLink>
          </div>
        </form>
        <div className="copyright">© 2023 ALL RIGHTS RESERVED</div>
      </section>
    </div>
  );
};

export default Login;
