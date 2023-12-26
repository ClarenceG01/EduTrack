const authroute = require("express").Router();
const {
  addUser,
  addAdmin,
  login,
  logout,
  getLoggedInUser,
} = require("../controllers/auth");
const { authenticate } = require("../middleware/authenticate");

authroute.post("/user/register", addUser);
authroute.post("/login", login);
authroute.post("/admin/register", addAdmin);
authroute.get("/logout", logout);
authroute.get("/authenticate", authenticate, (req, res) => {
  res.json({ message: "Authenticated" });
});
authroute.get("/loggedinuser", authenticate, getLoggedInUser);
// authroute.get("/tokens", (req, res) => {
//   const refresh_token = req.cookies.refreshtoken;
//   const access_token = req.cookies.accesstoken;
//   res.json({ message: "Tokens", refresh_token, access_token });
// });
// authroute.get("/test", (req, res) => {
//   res.json({ message: "Test" });
// });

module.exports = { authroute };
