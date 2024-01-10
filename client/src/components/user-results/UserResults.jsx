import React, { useRef } from "react";
import "./userresults.css";
import Year from "../yearlyprogress/Year";
import axios from "axios";
import Table from "../semester-results/Table";
import Pdf from "../pdf/Pdf";

const UserResults = () => {
  const contentRef = useRef();
  return (
    <div>
      <div className="user-result-component">
        <div className="yearly-result" ref={contentRef}>
          <Year />
        </div>
        <div className="semester-results">
          <Table />
        </div>
      </div>
      <Pdf contentRef={contentRef} />
    </div>
  );
};

export default UserResults;
