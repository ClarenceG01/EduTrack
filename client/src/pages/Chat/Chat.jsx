import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import io from "socket.io-client";
import "./chat.css";
import { IoMdSend } from "react-icons/io";

const socket = io("http://localhost:2000");
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = () => {
    socket.emit("sendMessage", { text: messageText });
    setMessageText("");
  };
  return (
    <div className="chat-component">
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            text={message.text}
          />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <IoMdSend className="send-icon" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:2000/chat");

// const Chat = ({ user }) => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   useEffect(() => {
//     socket.on("receiveMessage", (message) => {
//       setChatHistory((prevHistory) => [...prevHistory, message]);
//     });
//   }, []);

//   const sendMessage = () => {
//     const chatMessage = {
//       sender: user, // 'admin' or parent identifier
//       content: message,
//     };
//     socket.emit("sendMessage", chatMessage);
//     console.log("message sent", chatMessage);
//     setMessage("");
//   };

//   return (
//     <div>
//       <h2>Chat</h2>
//       <div>
//         {chatHistory.map((msg, index) => (
//           <p key={index}>
//             <b>{msg.sender}:</b> {msg.content}
//           </p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
