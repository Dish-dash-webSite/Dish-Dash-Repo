const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.SERVER_PORT || 5000;
const host = process.env.SERVER_HOST || "localhost";

const db = require("./database/connection.js");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration for Cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Enables cookies in requests
    allowedHeaders: ["Content-Type", "Authorization"], // Ensure correct headers
  })
);

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ✅ Start Server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

