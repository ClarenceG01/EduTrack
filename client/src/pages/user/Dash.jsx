import React from "react";
import "./dash.css";
import Sidemenu from "../../components/user-side/Sidemenu";
import { Outlet } from "react-router-dom";

const Dash = () => {
  return (
    <div className="user-dashboard">
      <Sidemenu />
      <Outlet />
    </div>
  );
};

export default Dash;
