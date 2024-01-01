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
