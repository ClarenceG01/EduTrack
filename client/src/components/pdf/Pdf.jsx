import React, { useEffect, useRef } from "react";
import "./pdf.css";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import axios from "axios";

const Pdf = ({ ref }) => {
  console.log(ref);
  const contentRef = useRef();
  const fetchReport = async () => {
    await axios
      .get("http://localhost:2000/report", { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const downloadPdf = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new JsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };
  useEffect(() => {
    fetchReport();
  }, []);
  return (
    <div>
      <div ref={contentRef} className="hide">
        {/* Your content here */}
        <h1>Title of your Content</h1>
        <p>This is the content of the PDF</p>
        {/* More content */}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default Pdf;
