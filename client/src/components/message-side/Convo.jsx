import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import getUser from "../../utils/getUser";
import "../../pages/Chat/chat.css";
import axios from "axios";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";

const socket = io("http://localhost:2000");
const Convo = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [role, setRole] = useState("");
  const [conversation, setConversation] = useState([]);
  const { id } = useParams();
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
      console.log(id);
      await axios
        .post("http://localhost:2000/admin/message", {
          sender_id: getUser().id,
          receiver_id: id,
          message_body: messageText,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      fetchConversation();
    } else {
      await axios
        .post("http://localhost:2000/user/message", {
          sender_id: getUser().id,
          recepient_id: "",
          message_body: messageText,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      fetchConversation();
    }
  };
  const fetchConversation = async () => {
    await axios
      .get(`http://localhost:2000/conversation/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setConversation(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const { role } = getUser();
    setRole(role);
  }, []);
  useEffect(() => {
    fetchConversation();
    console.log(conversation);
  }, [id]);
  return (
    <div className="messages-user-side">
      <div className="message-user-header">
        <span>Admin</span>
      </div>
      <div>
        {conversation.lenght === 0
          ? messages.map((message, index) => (
              <Message
                key={index}
                text={message.message_body}
                time={message.sent_at}
                className={role === "user" ? "right-message" : "left-message"}
              />
            ))
          : conversation.map((message, index) => (
              <Message
                key={index}
                text={message.message_body}
                time={message.sent_at}
                className={
                  message.sender_type === role
                    ? "right-message"
                    : "left-message"
                }
              />
            ))}
      </div>
      <div className="user-chat-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <RiSendPlaneFill onClick={sendMessage} className="user-chat-send-btn" />
      </div>
    </div>
  );
};

export default Convo;
