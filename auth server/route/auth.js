const authroute = require("express").Router();
const { addUser, addAdmin } = require("../controllers/auth");

authroute.post("/user/register", addUser);
authroute.post("/admin/register", addAdmin);

module.exports = { authroute };
