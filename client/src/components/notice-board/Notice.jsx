import React, { useState, useEffect } from "react";
import "./notice.css";
import axios from "axios";
import { successToast } from "../../utils/success_toast";
import { errorToast } from "../../utils/error_toast";
import pdfIcon from "../../../assets/pdf.svg";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const getNotice = async () => {
    try {
      const result = await axios.get(`http://localhost:2000/notice`, {
        withCredentials: true,
      });
      console.log(result.status);
      setNotices(result.data.notices);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("body", body);
    // post request to server
    const response = await axios.post(
      "http://localhost:2000/notice",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      successToast("File uploaded successfully");
      setTitle("");
      setBody("");
      getNotice();
    } else {
      errorToast("Error uploading file");
    }
  };
  useEffect(() => {
    getNotice();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit} className="notice-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Notice;
