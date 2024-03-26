const StatusCode = require("http-status-codes").StatusCodes;
const axios = require("axios");
async function userSendMessage(req, res) {
  const { pool } = req;
  if (pool.connected) {
    try {
      const { message_body, receiver_id, sender_id } = req.body;
      const result = await pool
        .request()
        .input("message_body", message_body)
        .input("receiver_id", receiver_id)
        .input("sender_id", sender_id)
        .execute("userSendMessage");
      res.status(StatusCode.OK).json({
        success: true,
        message: "User Message sent successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}
async function adminSendMessage(req, res) {
  const { pool } = req;
  if (pool.connected) {
    try {
      const { message_body, receiver_id, sender_id } = req.body;
      const result = await pool
        .request()
        .input("message_body", message_body)
        .input("receiver_id", receiver_id)
        .input("sender_id", sender_id)
        .execute("adminSendMessage");
      res.status(StatusCode.OK).json({
        success: true,
        message: "Admin Message sent successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}
async function searchUser(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const { search } = req.params;
      const result = await pool
        .request()
        .input("searchQuery", search)
        .execute("searchUser");
      res.status(StatusCode.OK).json({
        success: true,
        message: "Search result",
        data: result.recordset,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}
async function getAdminMessages(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const result = await pool.request().execute("getAdminMessages");
      res.status(StatusCode.OK).json({
        success: true,
        message: "Admin messages",
        data: result.recordset,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}
async function getUserMessages(req, res) {
  try {
    const { pool } = req;
    const { registration_no, email } = req.body;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("registration_no", registration_no)
        .input("email", email)
        .execute("getSingleUserMessages");
      res.status(StatusCode.OK).json({
        success: true,
        message: "User messages",
        data: result.recordset,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}
async function getConversation(req, res) {
  try {
    const { pool } = req;
    const { id } = req.params;
    if (pool.connected) {
      const result = await pool
        .request()
        .input("senderId", id)
        .execute("GetMessagesBySenderId");
      res.status(StatusCode.OK).json({
        success: true,
        message: "Conversion",
        data: result.recordset,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}
module.exports = {
  userSendMessage,
  adminSendMessage,
  searchUser,
  getAdminMessages,
  getUserMessages,
  getConversation,
};
