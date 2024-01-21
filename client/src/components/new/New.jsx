// import React, { useState, useEffect } from "react";
// import "./new.css";
// import axios from "axios";

// const New = () => {
//   const [filePath, setFilePath] = useState("");
//   const [notice, setNotices] = useState([]);

//   const getNotice = async () => {
//     const result = await axios.get(`http://localhost:2000/notice`, {
//       withCredentials: true,
//     });
//     console.log(result.data.notices);
//     setNotices(result.data.notices);
//   };
//   useEffect(() => {
//     getNotice();
//   }, []);

//   return (
//     <div>
//       <button
//         onClick={() => {
//           window.open(notice.file_path);
//         }}
//       >
//         Download
//       </button>
//     </div>
//   );
// };

// export default New;

import React, { useState, useEffect } from "react";
import "./new.css";
import axios from "axios";

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
    // Assuming 'http://localhost:2000/' is your server URL
    const fileUrl = `http://localhost:2000/uploads/${filePath}`;
    window.open(fileUrl, "_blank");
  };

  return (
    <div>
      {notices.map((notice, index) => (
        <div key={index} className="notice">
          <h3>{notice.notice_title}</h3>
          <p>{notice.notice_body}</p>
          <p>Created at: {new Date(notice.created_at).toLocaleString()}</p>
          {notice.file_path && (
            <button onClick={() => handleFileDownload(notice.file_path)}>
              View File
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default New;
