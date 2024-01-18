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
async function uploadNotice(req, res) {
  try {
    const filePath = req.file.path; // Path to the uploaded file
    const { pool } = req;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("notice_title", req.body.title)
        .input("notice_body", req.body.body)
        .input("file_path", filePath)
        .execute("addNotice");
      console.log(result);
      // console.log(filePath);
      // console.log(req.body.title);
      // console.log(req.body.body);
      res.send({ message: "File uploaded successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error uploading file." });
  }
}
module.exports = { totalUsers, searchStudent, getStudent, uploadNotice };
