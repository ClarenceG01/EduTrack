const request = require("express").Router();
const {
  addRequest,
  approveRequest,
  getRequests,
} = require("../controllers/request");

const { authenticate } = require("../middleware/authenticate");

request.post("/addrequest", authenticate, addRequest);
request.get("/getrequests", authenticate, getRequests);
module.exports = { request };
