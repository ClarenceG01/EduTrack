import React, { useEffect, useState } from "react";
import "./single.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

const Singlestudent = () => {
  const [student, setStudent] = useState([]);
  const location = useLocation();
  const { student_id } = location.state.student;
  const getStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/getstudent/${student_id}`
      );
      console.log(response.data.student);
      setStudent(response.data.student);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div className="single-student-component">
      <div className="student-details">
        <Avatar
          src={student.profile_pic}
          sx={{ width: 80, height: 80, marginBottom: "20px" }}
          alt={student.first_name}
        />
        <div className="student-name">
          <span>
            Name:
            <p>
              {student.first_name} {student.last_name}
            </p>
          </span>
        </div>
        <div className="registration-no">
          <span>
            Registration Number:
            <p>{student.registration_no}</p>
          </span>
        </div>
      </div>
      <div className="parent-details">
        <div className="parent-name">
          <span>
            Parent name:
            <p>
              {student.p_f_name} {student.p_l_name}
            </p>
          </span>
        </div>
        <div className="parent-contacts">
          <span>
            Email:
            <p>{student.p_email}</p>
          </span>
          <span>
            Phone number:
            <p>{student.p_phone}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Singlestudent;
