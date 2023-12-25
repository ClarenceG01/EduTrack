const results = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const { getResults } = require("../controllers/results");

results.get("/getresults", authenticate, getResults);

module.exports = { results };
