const StatusCode = require("http-status-codes").StatusCodes;
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
      res.status(StatusCode.OK).json({
        message: "Request sent successfully",
      });
    }
  } catch (error) {
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
// approve request
async function approveRequest(req, res) {
  const { email, phone, reg_no } = req.params;
  try {
    const { pool } = req;
    if (pool.connected) {
      //   const result = await pool
      //     .request()
      //     .input("email", email)
      //     .input("phone", phone)
      //     .input("registration_no", reg_no)
      //     .execute("approveRequest");
      //   console.log(result);
      console.log(email, phone, reg_no);
      res.json({
        email: email,
        phone: phone,
        registration_number: reg_no,
      });
    }
  } catch (error) {}
}
module.exports = {
  addRequest,
  changePassword,
  approveRequest,
};
