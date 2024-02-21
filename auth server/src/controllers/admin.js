const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { generateString } = require("../utils/randomPassword");
const bcrypt = require("bcrypt");
async function fetchStats(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      // no of users
      const result = await pool.request().execute("getNoOfUsers");
      const { Total_Users } = result.recordset[0];
      // no of pending request
      const pending = await pool.request().execute("getPendingRequestsCount");
      const { count } = pending.recordset[0];
      res.status(StatusCodes.OK).json({
        message: "successful",
        users: Total_Users,
        pending: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function searchStudent(req, res) {
  try {
    const { pool } = req;
    const { searchTerm } = req.params;
    const result = await pool
      .request()
      .input("search", searchTerm)
      .execute("searchStudent");
    res.status(StatusCodes.OK).json({
      message: "successful",
      students: result.recordset,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getStudent(req, res) {
  try {
    const { pool } = req;
    const { id } = req.params;
    const result = await pool
      .request()
      .input("student_id", id)
      .execute("getStudent");
    res.status(StatusCodes.OK).json({
      message: "successful",
      student: result.recordset[0],
    });
  } catch (error) {
    console.log(error);
  }
}
async function uploadNotice(req, res) {
  try {
    const { filename } = req.file; // Path to the uploaded file
    const { mimetype } = req.file;
    const { originalname } = req.file;
    console.log(req.file);
    const { pool } = req;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("notice_title", req.body.title)
        .input("notice_body", req.body.body)
        .input("file_path", filename)
        .input("file_type", mimetype)
        .input("file_name", originalname)
        .execute("addNotice");
      res.send({
        message: "File uploaded successfully.",
        data: result.recordset,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error uploading file." });
  }
}

async function getFilePath(req, res) {
  const { pool } = req;
  try {
    if (pool.connected) {
      const result = await pool.request().execute("getNotice");
      console.log(result.recordset[0]);
      const notice = result.recordset[0];
      // const { file_name } = notice;
      // const filePath = path.join(__dirname, notice.file_path);
      // const fileMimetype = notice.file_type;
      // res.setHeader("Content-Type", fileMimetype);
      // res.setHeader(
      //   "Content-Disposition",
      //   `attachment; filename="${file_name}"`
      // );

      res.status(StatusCodes.OK).json({
        success: true,
        message: "notices retrieved",
        notices: result.recordset,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function getEachSemesterUnitsAverage(req, res) {
  try {
    const { pool } = req;
    const { semester_name } = req.params;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("semester_name", semester_name)
        .execute("getEachSemesterUnitsAverage");
      res.status(StatusCodes.OK).json({
        message: "successful",
        data: result.recordset,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function getPendingRequests(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const result = await pool.request().execute("getPendingRequests");
      res.status(StatusCodes.OK).json({
        message: "successful",
        requests: result.recordset,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function approveRequest(req, res) {
  try {
    const { pool } = req;
    const generated_pwd = await generateString(8).trim();
    const hashed_pwd = await bcrypt.hash(generated_pwd, 8);
    console.log(hashed_pwd);
    const { email, phone_number, registration_no } = req.body;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("email", email)
        .input("pwd", hashed_pwd)
        .input("registration_no", registration_no)
        .input("phone_number", phone_number)
        .execute("adminApproveRequest");
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Request Approved",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
module.exports = {
  fetchStats,
  searchStudent,
  getStudent,
  uploadNotice,
  getFilePath,
  getEachSemesterUnitsAverage,
  getPendingRequests,
  approveRequest,
};
