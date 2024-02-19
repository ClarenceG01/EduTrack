import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { CiUser } from "react-icons/ci";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  async function getUsers() {
    await axios
      .get("http://localhost:2000/statistics")
      .then((users) => {
        console.log(users);
        setUserCount(users.data.users);
        setPendingCount(users.data.pending);
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
      <section className="home-content">
        <div>
          {/* <CiUser className="user-icon" /> */}
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
    </div>
  );
};

export default Home;
