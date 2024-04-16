import React, { useState } from "react";
import "./user.css";
import { errorToast } from "../../utils/error_toast";
import axios from "axios";
import { successToast } from "../../utils/success_toast";

const Addstudent = () => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    registrationNumber: "",
    yearOfStudy: "",
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationRegex = /^C\d{3}-\d{2}-\d{4}\/\d{4}$/;

    if (
      !student.firstName ||
      !student.lastName ||
      !student.registrationNumber ||
      !student.yearOfStudy
    ) {
      return errorToast("Please fill all fields");
    }

    if (!registrationRegex.test(student.registrationNumber)) {
      return errorToast(
        "Invalid registration number. Should be in the form 'Cxxx-xx-xxxx/xxxx'"
      );
    }

    await axios
      .post("http://localhost:2000/upload/student", student, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          successToast("Student uploaded successfully");
          setTimeout(() => {
            setStudent({
              firstName: "",
              lastName: "",
              registrationNumber: "",
              yearOfStudy: "",
            });
          }, 2000);
          setTimeout(() => {
            window.history.back();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast("Error uploading.");
      });
  };

  return (
    <div className="add-student-component">
      <span>Upload Student</span>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={student.registrationNumber}
            onChange={handleChange}
            placeholder="e.g C026-xx-xxxx/2019"
          />
        </label>
        <label>
          Year of Study:
          <input
            type="text"
            name="yearOfStudy"
            value={student.yearOfStudy}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Addstudent;
