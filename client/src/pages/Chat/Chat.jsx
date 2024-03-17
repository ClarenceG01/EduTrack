import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import io from "socket.io-client";
import getUser from "../../utils/getUser";
import "./chat.css";

const socket = io("http://localhost:2000");
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = () => {
    socket.emit("sendMessage", {
      text: messageText,
      user_id: getUser().id,
      username: getUser().role === "admin" ? "admin" : getUser().reg_no,
      recepient_id: getUser().role === "admin" ? "parent" : "admin",
    });
    setMessageText("");
  };
  return (
    <div className="chat-component">
      <div>
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            username={message.username}
            className={
              message.username === getUser().role ||
              message.username === getUser().reg_no
                ? "right-message"
                : "left-message"
            }
          />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
