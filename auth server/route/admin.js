const adminroute = require("express").Router();
const { totalUsers } = require("../controllers/admin");

adminroute.get("/totalusers", totalUsers);

module.exports = { adminroute };
