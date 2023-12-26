import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar className="sidebar" />
      <Navbar className="nav" />
      <Outlet className="content" />
    </div>
  );
};

export default Dashboard;
