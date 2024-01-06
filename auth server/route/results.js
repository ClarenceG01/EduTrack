const results = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const {
  getResults,
  getYearlyResults,
  getSemesterResults,
} = require("../controllers/results");

results.get("/getresults", authenticate, getResults);
results.get("/year/results", authenticate, getYearlyResults);
results.get("/semester/results/:semester", authenticate, getSemesterResults);

module.exports = { results };
