const jwt = require("jsonwebtoken");
const StatusCode = require("http-status-codes").StatusCodes;
async function getResults(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const access_token = req.cookies.accesstoken;
      const { id, reg_no } = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET
      );
      const result = await pool
        .request()
        .input("users_id", id)
        .execute("getUserResults");
      const results = result.recordsets[0];
      res.json(results);
    }
  } catch (error) {
    console.log(error);
  }
}
async function getYearlyResults(req, res) {
  try {
    const { pool } = req;
    const { student_id } = req.user;
    if (pool.connected) {
      // const access_token = req.cookies.accesstoken;
      // const { student_id } = jwt.verify(
      //   access_token,
      //   process.env.ACCESS_TOKEN_SECRET
      // );
      const result = await pool
        .request()
        .input("student_id", student_id)
        .execute("getYearlyResult");
      const data = result.recordsets[0];
      res.status(StatusCode.OK).json({
        success: true,
        message: "successful",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function getSemesterResults(req, res) {
  const { pool, user } = req;
  try {
    if (pool.connected) {
      const { student_id } = user;
      const { semester } = req.params;
      const result = await pool
        .request()
        .input("student_id", student_id)
        .input("semester_name", semester)
        .execute("getEachSemesterResults");
      const data = result.recordsets[0];
      res.status(StatusCode.OK).json({
        success: true,
        message: "successful",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function getReport(req, res) {
  try {
    const { pool } = req;
    const { student_id } = req.user;
    if (pool.connected) {
      const student = await pool
        .request()
        .input("student_id", student_id)
        .execute("getStudent");
      const yearly = await pool
        .request()
        .input("student_id", student_id)
        .execute("getYearlyResult");
      const all_semesters_results = await pool
        .request()
        .input("student_id", student_id)
        .execute("getAllSemesterResults");
      res.status(StatusCode.OK).json({
        success: true,
        message: "Student report retrieved",
        student_details: student.recordsets[0],
        yearly: yearly.recordsets[0],
        exam_results: all_semesters_results.recordsets[0],
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function uploadResults(req, res) {
  const { pool } = req;
  const { results } = req.body;
  if (pool.connected) {
    try {
      for (let result of results) {
        console.log(result);
      }
      res.status(StatusCode.OK).json({
        success: true,
        message: "Results uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "An error occurred while uploading results",
      });
    }
  }
}
module.exports = {
  getResults,
  getYearlyResults,
  getSemesterResults,
  getReport,
  uploadResults,
};
