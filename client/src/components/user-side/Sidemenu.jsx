import React from "react";
import "./Sidemenu.css";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { LineStyle, Settings } from "@material-ui/icons";
import { MdEvent } from "react-icons/md";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { BiSupport } from "react-icons/bi";

const Sidemenu = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="logo">
          <span>EduTrack</span>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/results" className="link">
            <li className="sidebarListItem">
              <AssessmentIcon className="sidebarIcon" />
              Results
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/event" className="link">
            <li className="sidebarListItem">
              <MdEvent className="sidebarIcon" />
              Events
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/chat" className="link">
            <li className="sidebarListItem">
              <BiSupport className="sidebarIcon" />
              Support
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/profile" className="link">
            <li className="sidebarListItem">
              <CgProfile className="sidebarIcon" />
              Profile
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/user/dashboard/settings" className="link">
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              Settings
            </li>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
