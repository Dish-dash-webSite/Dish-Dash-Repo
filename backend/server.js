// server.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
console.log(host);
const db = require("./database/connection.js");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:5173"|| 'http://localhost:3000',
  credentials: true // Enable credentials (cookies)
}));
const userRoutes = require('./routes/userRoutes');

// app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Use user routes
app.use('/api/users', userRoutes);

app.use(cookieParser()); // Add cookie parser



// Routes
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
