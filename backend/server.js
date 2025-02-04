// server.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST

const db = require("./database/connection.js");
const app = express();

const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use('/api/users', userRoutes);

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
