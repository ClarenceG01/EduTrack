import "./sidebar.css";
import { LineStyle, PermIdentity, Storefront } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="logo">
          <span>EduTrack</span>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/" className="link">
            <li className="sidebarListItem active">
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
          <NavLink to="/dashboard/requests" className="link">
            <li className="sidebarListItem">
              <Storefront className="sidebarIcon" />
              Requests
            </li>
          </NavLink>
        </div>
        <div className="sidebarMenu">
          <NavLink to="/dashboard/settings" className="link">
            <li className="sidebarListItem">
              <Storefront className="sidebarIcon" />
              Settings
            </li>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
