import React, { useEffect, useState } from "react";
import "./student.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";

const Student = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/search/${searchTerm}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.students);
        setSearchResults(response.data.students);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]); // Set empty array in case of error
      }
    };

    if (searchTerm !== "") {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="container">
          <span>Student :</span>
          <input
            placeholder="search..."
            type="text"
            className="searchbar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="student-container">
        {searchResults.map((student, index) => (
          <div className="student-card" key={index}>
            <div className="student-card-header">
              <span>{student.first_name}</span>
              <span> </span>
              <span>{student.last_name}</span>
              <div className="student-card-body-left">
                <span>{student.registration_no}</span>
              </div>
            </div>
            <div className="student-card-body">
              <div className="student-card-body-right">
                <span>{student.year_of_study}</span>
              </div>
              <div className="student-card-body-right">
                <button
                  onClick={() => {
                    navigate("/dashboard/singlestudent", {
                      state: { student },
                    });
                  }}
                >
                  View Student
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
