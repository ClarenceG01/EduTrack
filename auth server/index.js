const express = require("express");
const { authroute } = require("./route/auth");
const cors = require("cors");
const mssql = require("mssql");
const config = require("./config/dbconfig");
const StatusCode = require("http-status-codes").StatusCodes;

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
async function main() {
  // routes
  app.get("*", (req, res) => {
    res.status(404).json({ message: "404 Not Found" });
  });
  //   database connection
  try {
    const pool = await mssql.connect(config);
    if (pool.connected) {
      app.use((req, res, next) => {
        req.pool = pool;
        next();
      });
      app.use(authroute);
    } else {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
main();
