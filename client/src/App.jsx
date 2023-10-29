import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/request-access/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
