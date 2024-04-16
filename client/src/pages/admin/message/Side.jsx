import React, { useEffect, useState } from "react";
import "./side.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Side = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/message/search/${search}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    }
  };
  const getMessages = async () => {
    try {
      const response = await axios.get("http://localhost:2000/admin/message", {
        withCredentials: true,
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages([]);
    }
  };
  const handleCardClick = (message) => {
    console.log(message);
    navigate(`/dashboard/chat/${message.sender_id}`, {
      state: { message },
    });
  };
  useEffect(() => {
    if (search !== "") {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [search]);
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div className="sidechat-component">
      <div className="sidechat-top">
        <span>Messages:</span>
        <input
          placeholder="search parent..."
          type="text"
          className="searchbar"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="sidechats-container">
        {searchResults.length === 0
          ? messages.map((message, index) => (
              <div
                className="sidechat-card"
                key={index}
                onClick={() => handleCardClick(message)}
              >
                <div className="chat-user-details">
                  <span>{message.email}</span>
                  <span>{message.registration_no}</span>
                </div>
                {/* <div className="unread-messages-count"> */}
                {/* <span>{message.unread_messages}</span> */}
                {/* </div> */}
              </div>
            ))
          : searchResults.map((message, index) => (
              <div
                className="search-sidechat-card"
                key={index}
                onClick={() => handleCardClick(message)}
              >
                <span>{message.email}</span>
                <span>{message.registration_no}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Side;
