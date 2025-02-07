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
const categoryRoutes = require("./routes/categorieRoutes.js");


const app = express();
// const allowedOrigins = ['http://localhost:5174', 'https://your-production-domain.com'];
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5181'];


// app.use(cors({
//   origin: function ("origin", callback) {
//     if (allowedOrigins.includes(origin) || !origin) { // for requests without origin (e.g. Postman)
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,  // If you're using cookies
// }))
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies/auth
}));


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// app.use(cors());

// Use user routes
app.use('/api/users', userRoutes);

app.use("/api/resto", RestoRoter); // Add cookie parser

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/driver', DriverRouter);
app.use('/api/category', categoryRoutes);
// ✅ Middleware
// ✅ CORS Configuration for Cookies


// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true); // Allow the request
//     } else {
//       callback(new Error('Not allowed by CORS')); // Block the request
//     }
//   },
//   credentials: true, // If you're using cookies or authentication
// })