const adminroute = require("express").Router();
const { totalUsers, searchStudent } = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");

adminroute.get("/totalusers", totalUsers);
adminroute.get("/search/:searchTerm", authenticate, searchStudent);

module.exports = { adminroute };
