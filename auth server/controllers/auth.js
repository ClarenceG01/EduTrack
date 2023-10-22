const bcrypt = require("bcrypt");
const StatusCode = require("http-status-codes").StatusCodes;
const jwt = require("jsonwebtoken");

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
  const { username, pwd, email, registration_no } = req.body;
  try {
    const { pool } = req;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("username", username)
        .input("pwd", pwd)
        .input("email", email)
        .input("registration_no", registration_no)
        .execute("getUserOrAdmin");
      if (result.recordset.length > 0) {
        const pwd_from_db = result.recordset[0].pwd;
        const isMatch = await bcrypt.compare(pwd, pwd_from_db);
        if (isMatch) {
          //   check for email, user has email and admin doesn't
          if (result.recordset[0].email) {
            // generating tokens for user
            const reg_no = result.recordset[0].registration_no;
            const { users_id } = result.recordset[0];
            const payload = {
              userid: users_id,
              registration_number: reg_no,
              role: "user",
            };
            const access_token = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "15m",
              }
            );
            const refresh_token = jwt.sign(
              payload,
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "7d",
              }
            );
            // store both tokens in cookie
            res.cookie("accesstoken", access_token, {
              httpOnly: true,
              secure: true,
            });
            res.cookie("refreshtoken", refresh_token, {
              httpOnly: true,
              secure: true,
            });
          } else {
            //   generating tokens for admin
            const payload = {
              admin_id: result.recordset[0].admin_id,
              role: "admin",
            };
            const access_token = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "15m",
              }
            );
            const refresh_token = jwt.sign(
              payload,
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "7d",
              }
            );
            // store both tokens in cookie
            res.cookie("accesstoken", access_token, {
              httpOnly: true,
              secure: true,
            });
            res.cookie("refreshtoken", refresh_token, {
              httpOnly: true,
              secure: true,
            });
          }
          res.status(StatusCode.OK).json({
            message: "Login successful",
          });
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
  } catch (error) {
    console.log(error);
  }
}
module.exports = { addUser, addAdmin, login, logout };
