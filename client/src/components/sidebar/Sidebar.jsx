import "./sidebar.css";
import { React, useState } from "react";
import {
  LineStyle,
  PermIdentity,
  Settings,
  Assignment,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="logo">
          <span>EduTrack</span>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/users" className="link">
            <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Users
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/results" className="link">
            <li className="sidebarListItem">
              <Assignment className="sidebarIcon" />
              Results
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/students" className="link">
            <li className="sidebarListItem">
              <PiStudentFill className="sidebarIcon" />
              Student
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/event" className="link">
            <li className="sidebarListItem">
              <BiSupport className="sidebarIcon" />
              Support
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/settings" className="link">
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              Settings
            </li>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
