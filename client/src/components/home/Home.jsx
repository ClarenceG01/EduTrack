import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { CiUser } from "react-icons/ci";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { PiStudentFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { errorToast } from "../../utils/error_toast";
import { successToast } from "../../utils/success_toast";

const Home = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setJsonData(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
  };
  async function getUsers() {
    await axios
      .get("http://localhost:2000/statistics")
      .then((users) => {
        console.log(users);
        setUserCount(users.data.users);
        setPendingCount(users.data.pending);
        setStudentCount(users.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="home-component">
      <div className="home-stats">
        <section className="home-content">
          <div>
            <PeopleAltIcon
              className="user-icon"
              style={{ width: "60px", height: "60px" }}
            />
          </div>
          <div className="home-span">
            <span>Total Users</span>
            <span>{userCount}</span>
          </div>
        </section>
        <section className="home-content">
          <div className="">
            <PendingActionsIcon
              className="user-icon"
              style={{
                width: "60px",
                height: "60px",
              }}
            />
          </div>
          <div
            className="home-span"
            onClick={() => navigate("/dashboard/pending")}
          >
            <span>Pending Request</span>
            <span>{pendingCount}</span>
          </div>
        </section>
        <section className="home-content">
          <div>
            <PiStudentFill className="student-icon" />
          </div>
          <div className="home-span">
            <span>Total Students</span>
            <span>{studentCount}</span>
          </div>
        </section>
      </div>
      <div className="home-upload">
        <div className="upload-parent">
          <div className="upload-icon">
            <CiUser
              style={{
                width: "60px",
                height: "60px",
                padding: "0",
                margin: "0",
              }}
            />
            <span>Upload Parents</span>
          </div>
          <div className="upload-file-div">
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={() => {
                if (jsonData) {
                  axios
                    .post(
                      "http://localhost:2000/parents",
                      { parents: jsonData },
                      {
                        withCredentials: true,
                      }
                    )
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                } else {
                  errorToast("Please select a file to upload");
                }
              }}
            >
              Upload
            </button>
          </div>
          <button onClick={() => navigate("/dashboard/upload-user")}>
            Upload Manually
          </button>
        </div>
        <div className="upload-student">
          <div className="upload-icon">
            <PiStudentFill className="student-icon-2" />
            <span>Upload Students</span>
          </div>
          <div className="upload-file-div">
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={() => {
                if (jsonData) {
                  axios
                    .post(
                      "http://localhost:2000/students",
                      { students: jsonData },
                      {
                        withCredentials: true,
                      }
                    )
                    .then((res) => {
                      if (res.data.success) {
                        successToast("Students uploaded successfully");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      errorToast("Error uploading students.Try again later.");
                    });
                } else {
                  errorToast("Please select a file to upload");
                }
              }}
            >
              Upload
            </button>
          </div>
          <button onClick={() => navigate("/dashboard/upload-student")}>
            Upload Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
