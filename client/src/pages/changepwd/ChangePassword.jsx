import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./changepwd.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { successToast } from "../../utils/success_toast";
import { errorToast } from "../../utils/error_toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [old_pwd, setOld_pwd] = useState("");
  const [new_pwd, setNew_pwd] = useState("");
  const [confirm_pwd, setConfirm_pwd] = useState("");
  const [viewpwd, setViewpwd] = useState(false);
  const [viewconfirmpwd, setViewconfirmpwd] = useState(false);
  const [viewoldpwd, setViewoldpwd] = useState(false);
  const newPasswordRef = useRef(null);
  const [passwordValid, setPasswordValid] = useState(false);
  // const passwordRegex =
  //   /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  // const handlePasswordChange = () => {
  //   const newPassword = newPasswordRef.current.value;
  //   setPasswordValid(passwordRegex.test(newPassword));
  //   console.log(passwordValid);
  // };
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2000/changepassword",
        { old_pwd: old_pwd, new_pwd: new_pwd },
        { withCredentials: true }
      );
      if (res.data.message === "Password changed successfully") {
        successToast(res.data.message);
        setOld_pwd("");
        setNew_pwd("");
        setConfirm_pwd("");
      }
      setTimeout(() => {
        navigate("/user/dashboard/");
      }, 3000);
    } catch (err) {
      console.log(err);
      errorToast(err.response.data.message);
    }
  };
  return (
    <div className="form-component">
      <div className="log">
        <span>EduTrack</span>
      </div>
      <section className="form-section">
        <form onSubmit={changePassword}>
          <h3>Change Password</h3>
          <div className="form-div">
            <label htmlFor="oldpwd">Old Password</label>
            <input
              type={viewoldpwd ? "text" : "password"}
              className="form-control"
              id="oldpwd"
              placeholder="Enter Old Password"
              value={old_pwd}
              onChange={(e) => setOld_pwd(e.target.value)}
            />
            {viewoldpwd ? (
              <FaRegEye
                className="eye"
                onClick={() => setViewoldpwd(!viewoldpwd)}
              />
            ) : (
              <FaEyeSlash
                className="eye"
                onClick={() => setViewoldpwd(!viewoldpwd)}
              />
            )}
          </div>
          <div className="form-div">
            <label htmlFor="newpwd">New Password</label>
            <input
              type={viewpwd ? "text" : "password"}
              className="form-control"
              id="newpwd"
              placeholder="Enter New Password"
              value={new_pwd}
              onChange={(e) => setNew_pwd(e.target.value)}
              // ref={newPasswordRef}
              // onChange={handlePasswordChange}
            />
            {viewpwd ? (
              <FaRegEye className="eye" onClick={() => setViewpwd(!viewpwd)} />
            ) : (
              <FaEyeSlash
                className="eye"
                onClick={() => setViewpwd(!viewpwd)}
              />
            )}
          </div>
          <div className="form-div">
            <label htmlFor="confirmpwd">Confirm New Password</label>
            <input
              type={viewconfirmpwd ? "text" : "password"}
              className="form-control"
              id="confirmpwd"
              placeholder="Confirm Password"
              value={confirm_pwd}
              onChange={(e) => setConfirm_pwd(e.target.value)}
            />
            {viewconfirmpwd ? (
              <FaRegEye
                className="eye"
                onClick={() => setViewconfirmpwd(!viewconfirmpwd)}
              />
            ) : (
              <FaEyeSlash
                className="eye"
                onClick={() => setViewconfirmpwd(!viewconfirmpwd)}
              />
            )}
          </div>
          <div className="form-div">
            <button type="submit" className="submit-btn">
              Change Password
            </button>
          </div>
        </form>
      </section>
      <section className="password-rules">
        <ul>
          <li>Must be at least 8 characters long</li>
          <li>Must contain at least one uppercase letter</li>
          <li>Must contain at least one lowercase letter</li>
          <li>Must contain at least one number</li>
          <li>Must contain at least one special character</li>
        </ul>
      </section>
    </div>
  );
};

export default ChangePassword;
