const adminroute = require("express").Router();
const {
  totalUsers,
  searchStudent,
  getStudent,
} = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");

adminroute.get("/totalusers", totalUsers);
adminroute.get("/search/:searchTerm", authenticate, searchStudent);
adminroute.get("/getstudent/:id", getStudent);

module.exports = { adminroute };
