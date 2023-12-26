const jwt = require("jsonwebtoken");
async function getResults(req, res) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const access_token = req.cookies.accesstoken;
      const { id, reg_no } = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET
      );
      const result = await pool
        .request()
        .input("users_id", id)
        .execute("getUserResults");
      const results = result.recordsets[0];
      res.json(results);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getResults };
