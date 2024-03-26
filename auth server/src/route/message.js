const message = require("express").Router();
const {
  userSendMessage,
  adminSendMessage,
  searchUser,
  getAdminMessages,
  getUserMessages,
  getConversation,
} = require("../controllers/message");

message.post("/user/message", userSendMessage);
message.post("/admin/message", adminSendMessage);
message.get("/message/search/:search", searchUser);
message.get("/admin/message", getAdminMessages);
message.get("/user/message", getUserMessages);
message.get("/conversation/:id", getConversation);

module.exports = { message };
