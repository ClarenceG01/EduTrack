import React, { useState, useEffect } from "react";
import "./result.css";
import Radar from "../radar-chart/Radar";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { errorToast } from "../../utils/error_toast";
import { successToast } from "../../utils/success_toast";

const Result = () => {
  const [semester, setSemester] = useState("");
  const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const getSem = async () => {
    await axios
      .get(`http://localhost:2000/visuals/${semester}`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setJsonData(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
  };
  useEffect(() => {
    getSem();
  }, [semester]);
  return (
    <div>
      <span>Each unit average per semester</span>
      <div className="select-and-table">
        <div className="select-container">
          <label htmlFor="semester">Select Semester:</label>
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
        <div className="table-container">
          <table>
            <tr>
              <th>Unit Code</th>
              <th>Unit Name</th>
              <th>Average Score</th>
            </tr>
            {data.length === 0 ? (
              <p>No data to display...</p>
            ) : (
              data.map((result, index) => (
                <tr key={index}>
                  <td>{result.unit_code}</td>
                  <td>{result.unit_name}</td>
                  <td>{result.average_score}</td>
                </tr>
              ))
            )}
          </table>
        </div>
      </div>
      <Radar data={data} />
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        placeholder="Upload results"
      />
      <button
        className="upload-btn"
        onClick={() => {
          if (jsonData) {
            axios
              .post(
                "http://localhost:2000/results",
                { results: jsonData },
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                successToast("Results uploaded successfully");
              })
              .catch((err) => errorToast("Failed to upload results"));
          } else {
            errorToast("Please select a file to upload");
          }
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default Result;
