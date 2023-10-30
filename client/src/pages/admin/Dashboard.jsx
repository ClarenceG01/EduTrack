import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar className="sidebar" />
      <Outlet className="content" />
    </div>
  );
};

export default Dashboard;
