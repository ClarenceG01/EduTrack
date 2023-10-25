const authroute = require("express").Router();
const { addUser, addAdmin, login, logout } = require("../controllers/auth");

authroute.post("/user/register", addUser);
authroute.post("/login", login);
authroute.post("/admin/register", addAdmin);
authroute.get("/logout", logout);
authroute.get("/cookie", (req, res) => {
  res.json(req.cookies);
});
authroute.get("/", (req, res) => {
  res.json("Welcome to the auth route");
});

module.exports = { authroute };
