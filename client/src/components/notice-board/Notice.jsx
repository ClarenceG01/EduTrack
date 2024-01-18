import React, { useState } from "react";
import "./notice.css";
import axios from "axios";

const Notice = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("body", body);
    console.log(title);
    console.log(body);
    console.log(file);
    // Replace with your API endpoint
    const response = await axios.post(
      "http://localhost:2000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        rows="10"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Notice;
