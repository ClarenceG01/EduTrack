const express = require("express");
const { authroute } = require("./route/auth");
const { adminroute } = require("./route/admin");
const { request } = require("./route/request");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mssql = require("mssql");
const config = require("./config/dbconfig");
const StatusCode = require("http-status-codes").StatusCodes;
const http = require("http");
const socketIo = require("socket.io");
const { results } = require("./route/results");

const app = express();
const port = process.env.PORT || 2000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
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
  // establish socket connection
  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("sendMessage", (message) => {
      io.emit("message", message); // Broadcast the message to all connected clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
main();
