import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { successToast } from "../../utils/success_toast";
import { errorToast } from "../../utils/error_toast";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    reg_no: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const phone_regex = /^07\d{8}$/;
  const email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const regno_regex = /^C\d{3}-\d{2}-\d{4}\/\d{4}$/;
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    return user;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.phone || !user.reg_no) {
      return errorToast("Please fill in all the fields");
    }
    if (!phone_regex.test(user.phone)) {
      return errorToast("Invalid phone number");
    } else if (!email_regex.test(user.email)) {
      return errorToast("Invalid email");
    } else if (!regno_regex.test(user.reg_no)) {
      return errorToast("Invalid registration number");
    } else {
      setIsLoading(true);
      const data = handleChange(e);
      console.log(data);
      const result = await axios.post("http://localhost:2000/addrequest", data);
      if (result.data.message === "Request sent successfully") {
        setTimeout(() => {
          setIsLoading(false);
          setUser({
            email: "",
            phone: "",
            reg_no: "",
          });
          successToast("Request sent, check email for request status");
        }, 5000);
      }
    }
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
              placeholder="07** *** ***"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="reg_no">Student's Registration number:</label>
            <input
              type="text"
              id="phone-number"
              name="reg_no"
              value={user.reg_no}
              placeholder="e.g, C001-01-0000/2021"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <button
            className={
              user.email === "" || user.phone === "" || user.reg_no === ""
                ? "disabled-btn"
                : "submit-btn"
            }
            type="submit"
          >
            {isLoading ? <BeatLoader color="#eaf3f1" /> : <span>Submit</span>}
          </button>
          <div className="login-link">
            <NavLink to="/">
              <div>Already have an account, Login</div>
            </NavLink>
          </div>
        </form>
        <div className="copyright">© 2023 ALL RIGHTS RESERVED</div>
      </section>
    </div>
  );
};

export default Signup;
