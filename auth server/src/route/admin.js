const multer = require("multer");
const path = require("path");
const adminroute = require("express").Router();
const {
  totalUsers,
  searchStudent,
  getStudent,
  uploadNotice,
  getFilePath,
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
adminroute.get("/totalusers", totalUsers);
adminroute.get("/search/:searchTerm", authenticate, searchStudent);
adminroute.get("/getstudent/:id", getStudent);
adminroute.post("/notice", upload.single("file"), uploadNotice);
adminroute.get("/notice", authenticate, getFilePath);

module.exports = { adminroute };
