import React, { useState, useEffect } from "react";
import "./new.css";
import axios from "axios";
import pdfIcon from "../../../assets/pdf.svg";

const New = () => {
  const [notices, setNotices] = useState([]);
  const [date, setDate] = useState("");
  const getNotice = async () => {
    try {
      const result = await axios.get(`http://localhost:2000/notice`, {
        withCredentials: true,
      });
      setNotices(result.data.notices);
      const tarehe = result.data.notices[0].created_at.split("T")[0];
      setDate(tarehe);
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
    <div>
      <span className="notice-title">Notice Board</span>
      <div className="notice-list">
        {notices.map((notice, index) => (
          <div key={index} className="notice-item">
            <img src={pdfIcon} alt="PDF icon" className="notice-icon" />
            <div className="notice-content">
              <h3>{notice.notice_title}</h3>
              <p>{notice.notice_body}</p>
            </div>
            <div className="notice-right">
              <p>{date}</p>

              {notice.file_path && (
                <button
                  onClick={() => handleFileDownload(notice.file_path)}
                  className="notice-download-button"
                >
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default New;
