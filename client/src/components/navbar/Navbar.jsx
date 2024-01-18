import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Logout } from "@mui/icons-material";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { successToast } from "../../utils/success_toast";
import { errorToast } from "../../utils/error_toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await axios.get("http://localhost:2000/logout", {
      withCredentials: true,
    });
    console.log(response);
    if (response.data.message === "Logout successful") {
      successToast("Logout Successful");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      errorToast("Logout Failed,try later");
    }
  };
  const getLoggedInUser = async () => {
    const response = await axios.get("http://localhost:2000/loggedinuser", {
      withCredentials: true,
    });
    setUser(response.data.data);
  };
  useEffect(() => {
    getLoggedInUser();
  }, []);
  return (
    <nav className="navbar">
      <section>
        <p className="greetings">Hello</p>
        <span className="admin-username">{user.username}</span>
      </section>
      <section>
        <Logout className="logout" onClick={handleLogout} />
      </section>
    </nav>
  );
};

export default Navbar;
