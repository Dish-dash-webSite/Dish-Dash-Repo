// server.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
