import React from "react";

const Message = ({ username, text }) => {
  return (
    <div className="message-container">
      <p>{username}</p>
      <p>{text}</p>
    </div>
  );
};

export default Message;
