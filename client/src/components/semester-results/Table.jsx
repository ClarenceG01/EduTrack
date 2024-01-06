import React, { useState, useEffect } from "react";
import "./table.css";
import axios from "axios";

const Table = () => {
  const [semester, setSemester] = useState("1.1"); // default value

  const getSemesterResults = async () => {
    try {
      console.log(semester);
      const res = await axios.get(
        `http://localhost:2000/semester/results/${semester}`,
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSemesterResults();
  }, [semester]);

  return (
    <div>
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
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
        {/* data mapping */}
      </table>
    </div>
  );
};

export default Table;
