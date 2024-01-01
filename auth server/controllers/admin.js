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
        new: req.user,
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
module.exports = { totalUsers, searchStudent, getStudent };
