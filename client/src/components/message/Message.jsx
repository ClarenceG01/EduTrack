import React from "react";
import "./message.css";
const Message = ({ username, text, className }) => {
  console.log(className);
  return (
    <div className={className}>
      <p>{username}</p>
      <p>{text}</p>
    </div>
  );
};

export default Message;
