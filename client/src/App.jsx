import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/request-access/Signup";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Requests from "./components/requests/Requests";
import Settings from "./components/settings/Settings";
import Result from "./components/results/Result";
import ChangePassword from "./pages/changepwd/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Student from "./components/students/Student";
import Dash from "./pages/user/Dash";
import Userhome from "./components/userhome/Userhome";
import UserResults from "./components/user-results/UserResults";
import UserSettings from "./components/user-settings/UserSettings";
import Chat from "./pages/Chat/Chat";
import Singlestudent from "./components/single-student/Singlestudent";
import Notice from "./components/notice-board/Notice";
import New from "./components/new/New";
import Pending from "./pages/admin/Pending/Pending";
import Default from "./components/message-side/Default";
import Conversation from "./components/message-side/Conversation";
import Convo from "./components/message-side/Convo";
import Adduser from "./components/upload/Adduser";
import Addstudent from "./components/upload/Addstudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* admin dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/" element={<Home />}></Route>
          <Route path="/dashboard/upload-user" element={<Adduser />} />
          <Route path="/dashboard/upload-student" element={<Addstudent />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/results" element={<Result />} />
          <Route path="/dashboard/students" element={<Student />} />
          <Route
            path="/dashboard/singlestudent/:studentId"
            element={<Singlestudent />}
          />
          <Route path="/dashboard/chat" element={<Chat />}>
            <Route path="/dashboard/chat/" element={<Default />} />
            <Route path="/dashboard/chat/:id" element={<Conversation />} />
          </Route>
          <Route path="/dashboard/noticeboard" element={<Notice />} />
          <Route path="/dashboard/pending" element={<Pending />} />
        </Route>
        <Route path="/home" element={<Users />} />
        <Route path="/changepwd" element={<ChangePassword />} />
        {/* user dashboard */}
        <Route path="/user/dashboard" element={<Dash />}>
          <Route path="/user/dashboard/" element={<UserResults />} />
          <Route path="/user/dashboard/noticeboard" element={<New />} />
          <Route path="/user/dashboard/settings" element={<UserSettings />} />
          <Route path="/user/dashboard/chat" element={<Chat />}>
            <Route path="/user/dashboard/chat/:id" element={<Convo />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
