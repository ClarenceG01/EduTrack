const StatusCode = require("http-status-codes").StatusCodes;
const axios = require("axios");
const { createMarkup } = require("../utils/createMarkup");
const { sendMail } = require("../utils/sendMail");
const { generateString } = require("../utils/randomPassword");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

      // check if the request was approved
      if (request.rowsAffected[0] > 0) {
        // generated a random password
        const generated_pwd = await generateString(8).trim();
        console.log(generated_pwd);
        let html = await createMarkup("./view/accept.ejs", {
          Name: reg_no + " " + "parent/guardian",
          Phone: phone,
          Reg_no: reg_no,
          Password: generated_pwd,
        });
        let message = {
          to: "gc7651263@gmail.com",
          from: process.env.EMAIL_USER,
          subject: "Account Approval",
          html: html,
        };
        await sendMail(message);
        console.log(reg_no);
        await axios.post("http://localhost:2000/user/register", {
          email: email,
          pwd: generated_pwd,
          registration_no: reg_no,
          phone: phone,
        });
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
  const { old_pwd, new_pwd } = req.body;
  const new_hashed_pwd = await bcrypt.hash(new_pwd, 8);
  try {
    const { pool } = req;
    if (pool.connected) {
      const user_token = req.cookies.accesstoken;
      await jwt.verify(
        user_token,
        process.env.ACCESS_TOKEN_SECRET,
        async (error, payload) => {
          if (error) {
            res.status(StatusCode.UNAUTHORIZED).json({
              message: "Unauthorized",
            });
          } else {
            const { id } = payload;
            console.log(id);
            const result = await pool
              .request()
              .input("users_id", id)
              .execute("getUser");
            const pwd_from_db = result.recordset[0].pwd;
            const is_match = await bcrypt.compare(old_pwd, pwd_from_db);
            if (is_match) {
              const result = await pool
                .request()
                .input("id", id)
                .input("new_pwd", new_hashed_pwd)
                .execute("changePassword");
              if (result.rowsAffected[0] > 0) {
                res.status(StatusCode.OK).json({
                  message: "Password changed successfully",
                });
              } else {
                res.status(StatusCode.BAD_REQUEST).json({
                  message: "Password not changed, try again",
                });
              }
            } else {
              res.status(StatusCode.BAD_REQUEST).json({
                message: "Old password does not match",
              });
            }
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
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
