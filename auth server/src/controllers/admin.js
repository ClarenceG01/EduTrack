const { StatusCodes } = require("http-status-codes");
const path = require("path");
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
    const { filename } = req.file; // Path to the uploaded file
    const { mimetype } = req.file;
    const { originalname } = req.file;
    console.log(req.file);
    const { pool } = req;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("notice_title", req.body.title)
        .input("notice_body", req.body.body)
        .input("file_path", filename)
        .input("file_type", mimetype)
        .input("file_name", originalname)
        .execute("addNotice");
      res.send({
        message: "File uploaded successfully.",
        data: result.recordset,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error uploading file." });
  }
}

async function getFilePath(req, res) {
  const { pool } = req;
  try {
    if (pool.connected) {
      const result = await pool.request().execute("getNotice");
      console.log(result.recordset[0]);
      const notice = result.recordset[0];
      // const { file_name } = notice;
      // const filePath = path.join(__dirname, notice.file_path);
      // const fileMimetype = notice.file_type;
      // res.setHeader("Content-Type", fileMimetype);
      // res.setHeader(
      //   "Content-Disposition",
      //   `attachment; filename="${file_name}"`
      // );

      res.status(StatusCodes.OK).json({
        success: true,
        message: "notices retrieved",
        notices: result.recordset,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  totalUsers,
  searchStudent,
  getStudent,
  uploadNotice,
  getFilePath,
};
