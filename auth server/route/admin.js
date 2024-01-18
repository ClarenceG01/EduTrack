const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const adminroute = require("express").Router();
const {
  totalUsers,
  searchStudent,
  getStudent,
  uploadNotice,
} = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");

adminroute.get("/totalusers", totalUsers);
adminroute.get("/search/:searchTerm", authenticate, searchStudent);
adminroute.get("/getstudent/:id", getStudent);
adminroute.post("/upload", upload.single("file"), uploadNotice);

module.exports = { adminroute };
