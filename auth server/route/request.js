const request = require("express").Router();
const { addRequest, approveRequest } = require("../controllers/request");

const { authenticate } = require("../middleware/authenticate");

request.post("/addrequest", authenticate, addRequest);
request.get("/approverequest/:email/:phone/:reg_no(*)", approveRequest);

module.exports = { request };
