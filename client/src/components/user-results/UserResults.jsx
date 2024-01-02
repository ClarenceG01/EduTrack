import React from "react";
import "./userresults.css";
import Year from "../yearlyprogress/Year";

const UserResults = () => {
  return (
    <div className="user-result-component">
      <div className="yearly-result">
        <Year />
      </div>
    </div>
  );
};

export default UserResults;
