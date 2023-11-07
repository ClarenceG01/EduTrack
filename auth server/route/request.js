const request = require("express").Router();
const {
  addRequest,
  getRequests,
  changePassword,
} = require("../controllers/request");

const { authenticate } = require("../middleware/authenticate");

request.post("/addrequest", addRequest);
request.post("/changepassword", changePassword);
request.get("/getrequests", authenticate, getRequests);
module.exports = { request };
