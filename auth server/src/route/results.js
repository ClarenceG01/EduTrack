const results = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const {
  getResults,
  getYearlyResults,
  getSemesterResults,
  getReport,
  uploadResults,
} = require("../controllers/results");

results.get("/report", authenticate, getReport);
results.get("/getresults", authenticate, getResults);
results.get("/year/results", authenticate, getYearlyResults);
results.get("/semester/results/:semester", authenticate, getSemesterResults);
results.post("/results", uploadResults);

module.exports = { results };
