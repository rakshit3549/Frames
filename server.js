require("dotenv").config();
const express = require("express");
const ImageKit = require("imagekit");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Allow frontend requests from browser

const imagekit = new ImageKit({
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT 
});


app.get("/auth", (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});

app.listen(port, () => {
  console.log(`Auth server listening at http://localhost:${port}`);
});
