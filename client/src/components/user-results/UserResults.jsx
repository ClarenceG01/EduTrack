import React, { useEffect, useState } from "react";
import "./userresults.css";
import Year from "../yearlyprogress/Year";
import axios from "axios";
import Table from "../semester-results/Table";
import Pdf from "../pdf/Pdf";

const UserResults = () => {
  return (
    <div>
      <div className="user-result-component">
        <div className="yearly-result">
          <Year />
        </div>
        <div className="semester-results">
          <Table />
        </div>
      </div>
      <Pdf />
    </div>
  );
};

export default UserResults;
