const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT;

app.get("/gettokens", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:2000/tokens");
    console.log(response);

    // if (response.status === 200) {
    //   const { accessToken, refreshToken } = response.data;
    //   // Use the tokens in the results server
    //   res.json({ accessToken, refreshToken });
    // } else {
    //   res.status(401).json({ message: "Failed to retrieve tokens" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Results server is running on port ${port}`);
});
