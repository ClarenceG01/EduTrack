import React, { useEffect, useRef, useState } from "react";
import "./pdf.css";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import axios from "axios";
import { Avatar } from "@material-ui/core";

const Pdf = ({ contentRef }) => {
  const [results, setResults] = useState([]);
  const [student, setStudent] = useState([]);
  const newRef = useRef();
  const fetchReport = async () => {
    await axios
      .get("http://localhost:2000/report", { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data.student_details[0]);
        setStudent(res.data.student_details[0]);
        setResults(res.data.exam_results);
      })
      .catch((err) => console.log(err));
  };
  const downloadPdf = () => {
    Promise.all([html2canvas(newRef.current), html2canvas(contentRef.current)])
      .then(([canvas1, canvas2]) => {
        // Merge canvas1 and canvas2

        // Create a new canvas
        const mergedCanvas = document.createElement("canvas");
        mergedCanvas.width = Math.max(canvas1.width, canvas2.width);
        mergedCanvas.height = canvas1.height + canvas2.height * 10;

        // Get the context of the merged canvas
        const context = mergedCanvas.getContext("2d");

        // Draw both canvases on the merged canvas
        context.drawImage(canvas1, 0, 0);
        context.drawImage(canvas2, 0, canvas1.height);

        // Convert merged canvas to image
        return mergedCanvas.toDataURL("image/png");
      })
      .then((mergedImgData) => {
        // Create PDF
        const pdf = new JsPDF("p", "mm", "a4");
        const pageHeight = 297; // A4 height in mm
        pdf.addImage(mergedImgData, "PNG", 0, 0);
        pdf.addPage();
        pdf.addImage(mergedImgData, "PNG", 0, -pageHeight);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  useEffect(() => {
    fetchReport();
  }, []);
  return (
    <div>
      <div className="hide" ref={newRef}>
        <div>
          <Avatar src={student.profile_pic} />
          <div>
            <span>Name:{student.first_name + " " + student.last_name}</span>
            <span>Registration:{student.registration_no}</span>
            <span>Year:{student.year_of_study}</span>
          </div>
        </div>
        <table>
          <tr>
            <th>Unit Name</th>
            <th>Unit Code</th>
            <th>Semester</th>
            <th>Score</th>
          </tr>
          {/* data mapping */}
          {results.length === 0 ? (
            <p>No data to display ...</p>
          ) : (
            results.map((result, index) => (
              <tr key={index} className="pdf-tr">
                <td>{result.unit_name}</td>
                <td>{result.semester_name}</td>
                <td>{result.unit_code}</td>
                <td>{result.score}</td>
              </tr>
            ))
          )}
        </table>
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default Pdf;
