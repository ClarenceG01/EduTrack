const authroute = require("express").Router();
const { addUser, addAdmin, login, logout } = require("../controllers/auth");
const { authenticate } = require("../middleware/authenticate");

authroute.post("/user/register", addUser);
authroute.post("/login", login);
authroute.post("/admin/register", addAdmin);
authroute.get("/logout", logout);
authroute.get("/authenticate", authenticate, (req, res) => {
  res.json({ message: "Authenticated" });
});
authroute.get("/", (req, res) => {
  res.json(req.cookies);
});

module.exports = { authroute };
