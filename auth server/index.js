const express = require("express");
const { authroute } = require("./src/route/auth");
const { adminroute } = require("./src/route/admin");
const { request } = require("./src/route/request");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mssql = require("mssql");
const config = require("./src/config/dbconfig");
const StatusCode = require("http-status-codes").StatusCodes;
const http = require("http");
const socketIo = require("socket.io");
const { results } = require("./src/route/results");
const path = require("path");
const { ejs } = require("ejs");
const socketIOSession = require("express-socket.io-session");

const app = express();
const port = process.env.PORT || 2000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  },
});

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// establish socket connection
// establish socket connection
io.on("connection", (socket) => {
  console.log("New user connected ");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

async function main() {
  //   database connection
  try {
    const pool = await mssql.connect(config);
    if (pool.connected) {
      app.use((req, res, next) => {
        req.pool = pool;
        next();
      });
      app.use(authroute, request, adminroute, results);
      app.get("/", (req, res) => {
        res.json({ message: "Welcome to the server" });
      });

      app.get("*", (req, res) => {
        res.status(404).json({ message: "404 Not Found" });
      });
    } else {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
  }

  server.listen(port, () => console.log(`Server is running on port ${port}`));
}
main();

// const chat = io.of("/chat");
// chat.on("connection", (socket) => {
//   console.log("a user connected:", socket.id);

//   socket.on("sendMessage", (message) => {
//     // message should include the sender, receiver (if any), and the message content
//     console.log(message);

//     // If admin sends a message, emit to all parents
//     if (message.sender === "admin") {
//       chat.emit("receiveMessage", message);
//     } else {
//       // If a parent sends a message, emit only to admin
//       chat.to("adminSocketId").emit("receiveMessage", message);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
