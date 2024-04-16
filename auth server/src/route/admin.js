const multer = require("multer");
const path = require("path");
const adminroute = require("express").Router();
const {
  fetchStats,
  searchStudent,
  getStudent,
  uploadNotice,
  getFilePath,
  getEachSemesterUnitsAverage,
  getPendingRequests,
  approveRequest,
  addParent,
  addParents,
  addStudent,
  addStudents,
} = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
adminroute.get("/statistics", fetchStats);
adminroute.get("/search/:searchTerm", authenticate, searchStudent);
adminroute.get("/getstudent/:id", getStudent);
adminroute.post("/notice", upload.single("file"), uploadNotice);
adminroute.get("/notice", authenticate, getFilePath);
adminroute.get(
  "/visuals/:semester_name",
  authenticate,
  getEachSemesterUnitsAverage
);
adminroute.get("/pending", authenticate, getPendingRequests);
adminroute.post("/approve", authenticate, approveRequest);
adminroute.post("/upload/parent", authenticate, addParent);
adminroute.post("/parents", authenticate, addParents);
adminroute.post("/upload/student", authenticate, addStudent);
adminroute.post("/students", authenticate, addStudents);

module.exports = { adminroute };
