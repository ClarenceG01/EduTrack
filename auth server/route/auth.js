const authroute = require("express").Router();
const { addUser, addAdmin, login, logout } = require("../controllers/auth");

authroute.post("/user/register", addUser);
authroute.post("/login", login);
authroute.post("/admin/register", addAdmin);
authroute.get("/logout", logout);

module.exports = { authroute };
