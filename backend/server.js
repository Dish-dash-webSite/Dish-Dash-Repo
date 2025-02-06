const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const RestoRoter = require("./routes/restaurantRoutes.js")
const port = 3000;
const db = require("./database/connection.js");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const DriverRouter= require("./routes/driverRoutes.js");

const app = express();
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors());



// Use user routes
app.use('/api/users', userRoutes);

app.use("/api/resto", RestoRoter); // Add cookie parser

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/driver', DriverRouter);

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

