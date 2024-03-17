const bcrypt = require("bcrypt");
const StatusCode = require("http-status-codes").StatusCodes;
const jwt = require("jsonwebtoken");
const { user } = require("../config/dbconfig");

async function addUser(req, res) {
  try {
    const { email, pwd, phone, registration_no } = req.body;
    const { pool } = req;
    if (pool.connected) {
      const hashed_pwd = await bcrypt.hash(pwd, 8);
      const result = await pool
        .request()
        .input("email", email)
        .input("pwd", hashed_pwd)
        .input("registration_no", registration_no)
        .input("phone", phone)
        .execute("addUser");
      if (result.rowsAffected[0] > 0) {
        res.status(StatusCode.OK).json({
          message: "User added successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function addAdmin(req, res) {
  const { username, pwd, phone } = req.body;
  const hashed_pwd = await bcrypt.hash(pwd, 8);
  try {
    const { pool } = req;
    if (pool.connected) {
      const results = await pool
        .request()
        .input("username", username)
        .input("pwd", hashed_pwd)
        .input("phone", phone)
        .execute("addAdmin");
      if (results.rowsAffected[0] > 0) {
        res.status(StatusCode.OK).json({
          message: "Admin added successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// login user or admin, check both tables(user & admin)
async function login(req, res) {
  const { pool } = req;
  const { username, pwd, email, registration_no, phone } = req.body;
  try {
    if (pool) {
      const result = await pool
        .request()
        .input("credential", username || email || registration_no || phone)
        .input("pwd", pwd)
        .execute("Test");
      if (result.rowsAffected[0] === 0 && result.rowsAffected[1] === 0) {
        res.status(StatusCode.NOT_FOUND).json({
          message: "User not found",
        });
      } else {
        if (result.recordsets[0].length === 0) {
          const user_details = result.recordsets[1][0];
          const pwd_from_db = user_details.pwd;
          const isMatch = await bcrypt.compare(pwd, pwd_from_db);
          if (isMatch) {
            // generating tokens for admin
            const user_payload = {
              id: user_details.admin_id,
              role: "admin",
            };
            const access_token = jwt.sign(
              user_payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            );
            const refresh_token = jwt.sign(
              user_payload,
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "7d",
              }
            );
            res
              .cookie("refreshtoken", refresh_token, {
                httpOnly: false,
                sameSite: "none",
                secure: true,
              })
              .cookie("accesstoken", access_token, {
                httpOnly: false,
                sameSite: "none",
                secure: true,
              })
              .status(StatusCode.OK)
              .json({
                success: true,
                message: "Login successful",
                cookies: access_token,
              });
          } else {
            res.status(StatusCode.UNAUTHORIZED).json({
              message: "Invalid credentials",
            });
          }
        } else {
          const user_details = result.recordsets[0][0];
          // get students_id corresponding to user
          const response = await pool
            .request()
            .input("user_id", user_details.users_id)
            .execute("getStudentId");
          const student_id = response.recordset[0].student_id;
          // check if pwd matches
          const pwd_from_db = user_details.pwd;
          const isMatch = await bcrypt.compare(pwd, pwd_from_db);
          if (isMatch) {
            // generate tokens for user
            const user_payload = {
              id: user_details.users_id,
              reg_no: user_details.registration_no,
              student_id: student_id,
              role: "user",
            };
            const access_token = jwt.sign(
              user_payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            );
            const refresh_token = jwt.sign(
              user_payload,
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "7d",
              }
            );
            res
              .cookie("refreshtoken", refresh_token, {
                httpOnly: false,
                sameSite: "none",
                secure: true,
              })
              .cookie("accesstoken", access_token, {
                httpOnly: false,
                sameSite: "none",
                secure: true,
              })
              .status(StatusCode.OK)
              .json({
                success: true,
                message: "Login successful",
                cookies: access_token,
                is_pwd_changed: user_details.pwd_changed,
              });
          } else {
            res.status(StatusCode.UNAUTHORIZED).json({
              message: "Invalid credentials",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.status(StatusCode.OK).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
  }
}
async function getLoggedInUser(req, res) {
  try {
    const { pool } = req;
    const access_token = req.cookies.accesstoken;
    const { role, id } = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (role === "admin") {
      const result = await pool
        .request()
        .input("admin_id", id)
        .execute("getAdmin");
      const data = result.recordset[0];
      res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      const result = await pool
        .request()
        .input("users_id", id)
        .execute("getLoggedInUser");
      const data = result.recordset[0];
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  addUser,
  addAdmin,
  login,
  logout,
  getLoggedInUser,
};
