const bcrypt = require("bcrypt");
const StatusCode = require("http-status-codes").StatusCodes;
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
async function addAdmin(req, res) {}
module.exports = { addUser, addAdmin };
