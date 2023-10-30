import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/request-access/Signup";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Requests from "./components/requests/Requests";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/" element={<Home />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
