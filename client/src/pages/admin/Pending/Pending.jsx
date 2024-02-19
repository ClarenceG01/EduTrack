import React, { useEffect, useState } from "react";
import "./pending.css";
import axios from "axios";
import { Button } from "@mui/material";

const Pending = () => {
  const [requests, setRequests] = useState([]);
  const fetchPending = async () => {
    await axios
      .get("http://localhost:2000/pending", { withCredentials: true })
      .then((res) => setRequests(res.data.requests))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchPending();
  }, []);
  async function handleApprove(request) {
    await axios
      .post(
        "http://localhost:2000/approve",
        {
          email: request.email,
          phone_number: request.phone_number,
          registration_no: request.registration_no,
        },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data.originalError))
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <h3 className="pending-title">Pending Requests</h3>
      <div className="pending-container">
        {requests.map((request) => (
          <div className="pending-card" key={request.email}>
            <p>{request.email}</p>
            <p>{request.phone_number}</p>
            <p>{request.registration_no}</p>
            <p>
              {request.request_time.substring(
                0,
                request.request_time.indexOf("T")
              )}
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApprove(request)}
            >
              Approve
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pending;
