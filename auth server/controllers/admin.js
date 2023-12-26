const { StatusCodes } = require("http-status-codes");

async function totalUsers(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const result = await pool.request().execute("getNoOfUsers");
      const { Total_Users } = result.recordset[0];
      res.status(StatusCodes.OK).json({
        message: "successful",
        users: Total_Users,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { totalUsers };
