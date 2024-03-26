// import React, { useState, useEffect } from "react";
// import Message from "../../components/message/Message";
// import io from "socket.io-client";
// import getUser from "../../utils/getUser";
// import "./chat.css";
// import axios from "axios";
// import Side from "../admin/message/Side";

// const socket = io("http://localhost:2000");
// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [role, setRole] = useState("");
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("connected");
//     });
//     socket.on("message", (message) => {
//       console.log(message);
//       setMessages([...messages, message]);
//     });
//   }, [messages]);
//   const sendMessage = async () => {
//     socket.emit("sendMessage", {
//       text: messageText,
//       user_id: getUser().id,
//       username: getUser().role === "admin" ? "admin" : getUser().reg_no,
//       recepient_id: getUser().role === "admin" ? "parent" : "admin",
//     });
//     setMessageText("");

//     if (getUser().role === "admin") {
//       await axios
//         .post("http://localhost:2000/admin/message", {
//           sender_id: getUser().id,
//           recepient_id: "",
//           message_body: messageText,
//         })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
//     } else {
//       await axios
//         .post("http://localhost:2000/user/message", {
//           sender_id: getUser().id,
//           recepient_id: "",
//           message_body: messageText,
//         })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
//     }
//   };
//   useEffect(() => {
//     const { role } = getUser();
//     setRole(role);
//   }, []);
//   return (
//     <div className="chat-component">
//       {role === "admin" ? <Side /> : null}
//       <div className="messages-side">
//         <div>
//           {messages.map((message, index) => (
//             <Message
//               key={index}
//               text={message.text}
//               username={message.username}
//               className={
//                 message.username === getUser().role ||
//                 message.username === getUser().reg_no
//                   ? "right-message"
//                   : "left-message"
//               }
//             />
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import io from "socket.io-client";
import getUser from "../../utils/getUser";
import "./chat.css";
import axios from "axios";
import Side from "../admin/message/Side";
import { Outlet } from "react-router-dom";

const socket = io("http://localhost:2000");
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = async () => {
    socket.emit("sendMessage", {
      text: messageText,
      user_id: getUser().id,
      username: getUser().role === "admin" ? "admin" : getUser().reg_no,
      recepient_id: getUser().role === "admin" ? "parent" : "admin",
    });
    setMessageText("");

    if (getUser().role === "admin") {
      await axios
        .post("http://localhost:2000/admin/message", {
          sender_id: getUser().id,
          recepient_id: "",
          message_body: messageText,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      await axios
        .post("http://localhost:2000/user/message", {
          sender_id: getUser().id,
          recepient_id: "",
          message_body: messageText,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    const { role } = getUser();
    setRole(role);
  }, []);
  return (
    <div className="chat-component">
      {role === "admin" ? <Side /> : null}
      <Outlet />
    </div>
  );
};

export default Chat;
