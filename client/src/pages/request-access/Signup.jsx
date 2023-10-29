import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  // states
  const [user, setUser] = useState({
    email: "",
    phone: "",
    regno: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //handle the data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  return (
    <div className="signup-component">
      <section className="image-section">
        <div>
          <img src="../../../assets/login.jpg" alt="" />
        </div>
      </section>
      <section className="login-form">
        <form>
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
              name="regno"
              value={user.regno}
              placeholder="Student's registration number"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <button className="login-btn" type="submit">
            Submit
          </button>
        </form>
      </section>
      <section>
        <span className="copyright">© 2023 ALL RIGHTS RESERVED</span>
      </section>
    </div>
  );
};

export default Signup;
