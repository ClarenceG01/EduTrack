import React, { useState } from "react";
import "./user.css";
import { errorToast } from "../../utils/error_toast";
import axios from "axios";

const Adduser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    registrationNumber: "",
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.phoneNumber ||
      !user.registrationNumber
    ) {
      return errorToast("Please fill all fields");
    }
    await axios
      .post(
        "http://localhost:2000/upload/parent",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          registrationNumber: user.registrationNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          successToast("Parent uploaded successfully");
          setTimeout(() => {
            setUser({
              firstName: "",
              lastName: "",
              phoneNumber: "",
              email: "",
              registrationNumber: "",
            });
          }, 2000);
          setTimeout(() => {
            window.history.back();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(
          "Error uploading.Ensure the registration number used is for a registered student"
        );
      });
  };
  return (
    <div className="add-student-component">
      <span>Upload Parent</span>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={user.registrationNumber}
            onChange={handleChange}
            placeholder="e.g C026-xx-xxxx/2019"
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Adduser;
