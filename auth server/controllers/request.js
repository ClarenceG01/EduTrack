const StatusCode = require("http-status-codes").StatusCodes;
const axios = require("axios");
const { createMarkup } = require("../utils/createMarkup");
const { sendMail } = require("../utils/sendMail");
// send requests to database
async function addRequest(req, res) {
  try {
    const { pool } = req;
    const { email, phone, reg_no } = req.body;
    const result = await pool
      .request()
      .input("email", email)
      .input("phone", phone)
      .input("registration_no", reg_no)
      .execute("addRequest");
    if (result.rowsAffected[0] > 0) {
      const request = await pool
        .request()
        .input("phone", phone)
        .input("registration_no", reg_no)
        .execute("approveRequest");
      if (request.rowsAffected[0] > 0) {
        let html = await createMarkup("./view/accept.ejs", {
          Name: reg_no + " " + "parent/guardian",
          Phone: phone,
          Reg_no: reg_no,
          Password: "password",
        });
        let message = {
          to: "gc7651263@gmail.com",
          from: process.env.EMAIL_USER,
          subject: "Account Approval",
          html: html,
        };
        await sendMail(message);
      } else {
        let html = await createMarkup("./view/reject.ejs", {
          Reg_no: reg_no,
        });
        let message = {
          to: "gc7651263@gmail.com",
          from: process.env.EMAIL_USER,
          subject: "Account Rejection",
          html: html,
        };
        await sendMail(message);
        await pool.request().input("email", email).execute("deleteRequest");
      }

      res.status(StatusCode.OK).json({
        message: "Request sent successfully",
      });
    }
  } catch (error) {
    console.log(error);
    if (
      error.originalError.info.message.includes(
        "Violation of UNIQUE KEY constraint"
      )
    ) {
      res.status(StatusCode.BAD_REQUEST).json({
        message: "Email or Phone number already used for Request",
      });
    }
  }
}
// user is created using a default password,they have to change their password
async function changePassword(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
    }
  } catch (error) {}
}
async function getRequests(req, res) {
  try {
    const pool = req.pool;
    if (pool.connected) {
      const result = await pool.request().execute("getRequests");
      if (result.rowsAffected[0] > 0) {
        res.status(StatusCode.OK).json({
          message: "Data retrieved successfully",
          requests: result.recordset,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  addRequest,
  changePassword,
  getRequests,
};
