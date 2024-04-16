const jwt = require("jsonwebtoken");
const StatusCode = require("http-status-codes").StatusCodes;
const { sendMail } = require("../utils/sendMail");
const { createMarkup } = require("../utils/createMarkup");
const { text } = require("express");
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
      const groupedResults = await groupResultsByEmail(pool, results);
      for (const [email, groupedResult] of Object.entries(groupedResults)) {
        try {
          const resp = await pool
            .request()
            .input("unitCode", groupedResult[0].unit_code)
            .execute("getUnit");
          const unitName = resp.recordset[0].unit_name;
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Results Uploaded",
            html: await createMarkup("./src/view/result.ejs", {
              Name:
                groupedResult[0].first_name + " " + groupedResult[0].last_name,
              Reg_No: groupedResult[0].reg_number,
              Unit: unitName,
              unit_code: groupedResult[0].unit_code,
              score: groupedResult[0].score,
              grade: groupedResult[0].grade,
              allResults: groupedResult,
            }),
          };
          await sendMail(mailOptions);
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while sending emails",
          });
        }
      }

      // If all emails sent successfully
      res.status(StatusCode.OK).json({
        success: true,
        message: "Results uploaded and emails sent successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "An error occurred while uploading results",
      });
    }
  }
}

async function groupResultsByEmail(pool, results) {
  const groupedResults = {};
  for (let result of results) {
    try {
      const parentResponse = await pool
        .request()
        .input("registration_number", result.reg_number)
        .execute("getParent");
      if (parentResponse.recordset && parentResponse.recordset.length > 0) {
        const { email } = parentResponse.recordset[0];
        console.log(email);
        // Assuming email is retrieved from the stored procedure result
        if (!groupedResults[email]) {
          groupedResults[email] = [];
        }
        groupedResults[email].push(result);
      } else {
        console.error(
          "Parent information not found for registration number:",
          result.reg_number
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  return groupedResults;
}
module.exports = {
  getResults,
  getYearlyResults,
  getSemesterResults,
  getReport,
  uploadResults,
};
// let html= await createMarkup("./src/view/")
// const mailOptions = {
//   from: process.env.EMAIL_USER,
//   to: email,
//   subject: "Results Uploaded",
//   html: html,
// };
// await sendMail(mailOptions);
