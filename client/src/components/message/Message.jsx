import React from "react";
import "./message.css";
const Message = ({ time, text, className }) => {
  const [datePart, timePart] = time.split("T");
  return (
    <div className={className}>
      <p>{text}</p>
      <div className="message-time">
        <p>{datePart}</p>
        <p>{timePart.substring(0, 5)}</p>
      </div>
    </div>
  );
};

export default Message;
