import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  // states
  const [user, setUser] = useState({
    email: "",
    phone: "",
    reg_no: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //handle the data
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    return user;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = handleChange(e);
    console.log(data);
    await axios.post("http://localhost:2000/addrequest", data).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="signup-component">
      <section className="image-section">
        <img src="../../../assets/login.jpg" alt="" />
      </section>
      <section className="signup-form">
        <form onSubmit={handleSubmit}>
          <span>Welcome to EduTrack👋</span>
          <div className="subtitle">
            <p>
              Your resource for tracking computer science student's progress!
            </p>
            <p>To get started fill in the form below:</p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              placeholder="Example@gmail.com"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone-number">Phone number:</label>
            <input
              type="number"
              id="phone-number"
              name="phone"
              value={user.phone}
              placeholder="+2547** *** ***"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="reg_no">Registration number:</label>
            <input
              type="text"
              id="phone-number"
              name="reg_no"
              value={user.reg_no}
              placeholder="Student's registration number"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <button className="signup-btn" type="submit">
            Submit
          </button>
          <div className="login-link">
            <NavLink to="/">
              <div>Already have an account, Login</div>
            </NavLink>
          </div>
          <span className="copyright">© 2023 ALL RIGHTS RESERVED</span>
        </form>
      </section>
    </div>
  );
};

export default Signup;
