import React, { useState, useEffect } from "react";
import "./result.css";
import Radar from "../radar-chart/Radar";
import axios from "axios";

const Result = () => {
  const [semester, setSemester] = useState("");
  const [data, setData] = useState([]);
  const getSem = async () => {
    await axios
      .get(`http://localhost:2000/visuals/${semester}`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSem();
  }, [semester]);
  return (
    <div>
      <div className="select-container">
        <span>Each unit average per semester</span>
        <select onChange={(e) => setSemester(e.target.value)}>
          <option value="1.1">Semester 1.1</option>
          <option value="1.2">Semester 1.2</option>
          <option value="2.1">Semester 2.1</option>
          <option value="2.2">Semester 2.2</option>
          <option value="3.1">Semester 3.1</option>
          <option value="3.2">Semester 3.2</option>
          <option value="4.1">Semester 4.1</option>
          <option value="4.2">Semester 4.2</option>
        </select>
      </div>
      <Radar data={data} />
    </div>
  );
};

export default Result;
