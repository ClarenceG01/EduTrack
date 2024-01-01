// import React, { useEffect, useState } from "react";
// import "./student.css";
// import { FaSearch } from "react-icons/fa";
// import axios from "axios";

// const Student = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const handleSearch = async (e) => {
//     console.log(e.target.value);
//     setSearchTerm(e.target.value);
//     await axios
//       .get(`http://localhost:2000/search/${searchTerm}}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     console.log(searchResults);
//   };
//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm]);
//   return (
//     <div>
//       <div>
//         <div className="container">
//           <span>Student :</span>
//           <input
//             placeholder="search..."
//             type="text"
//             className="searchbar"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <FaSearch className="search-icon" />
//         </div>
//       </div>
//       <div className="student-container">
//         {searchResults.map((student, index) => (
//           <div className="student-card" key={index}>
//             <div className="student-card-header">
//               <span>{student.name}</span>
//             </div>
//             <div className="student-card-body">
//               <div className="student-card-body-left">
//                 <span>Roll No :</span>
//                 <span>{student.rollno}</span>
//               </div>
//               <div className="student-card-body-right">
//                 <span>Class :</span>
//                 <span>{student.class}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Student;

import React, { useEffect, useState } from "react";
import "./student.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Student = () => {
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
                <button>View Student</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
