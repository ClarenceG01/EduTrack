import React, { useState, useEffect } from "react";
import "./new.css";
import axios from "axios";
import pdfIcon from "../../../assets/pdf.svg";

const New = () => {
  const [notices, setNotices] = useState([]);

  const getNotice = async () => {
    try {
      const result = await axios.get(`http://localhost:2000/notice`, {
        withCredentials: true,
      });
      setNotices(result.data.notices);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  const handleFileDownload = (filePath) => {
    const fileUrl = `http://localhost:2000/uploads/${filePath}`;
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="notice-list">
      <span className="notice-title">Notice Board</span>
      {notices.map((notice, index) => (
        <div key={index} className="notice-item">
          <img src={pdfIcon} alt="PDF icon" className="notice-icon" />
          <div className="notice-content">
            <h3>{notice.notice_title}</h3>
            <p>{notice.notice_body}</p>
            {/* <p>Created at: {new Date(notice.created_at).toLocaleString()}</p> */}
          </div>
          {notice.file_path && (
            <button
              onClick={() => handleFileDownload(notice.file_path)}
              className="notice-download-button"
            >
              View
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default New;
