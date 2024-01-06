import React, { useEffect, useState } from "react";
import "./userresults.css";
import Year from "../yearlyprogress/Year";
import axios from "axios";
import Table from "../semester-results/Table";

const UserResults = () => {
  return (
    <div className="user-result-component">
      <div className="yearly-result">
        <Year />
      </div>
      <div className="semester-results">
        <Table />
      </div>
    </div>
  );
};

export default UserResults;
