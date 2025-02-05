const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const RestoRoter = require("./routes/restaurantRoutes.js")
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
// const DriverRouter = require('./routes/driverRoutes'); 
// const DriverRouter = require('./routes/driverRoutes'); 
const db = require("./database/connection.js");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) { // for requests without origin (e.g. Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // If you're using cookies
}));



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use('/api/users', userRoutes);

app.use("/api/resto", RestoRoter)
// Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   credentials: true // Enable credentials (cookies)
// }));
app.use(cookieParser()); // Add cookie parser



// Routes
app.use('/api/admin', adminRoutes);
// app.use('/api/driver', DriverRouter);
// app.use('/api/driver', DriverRouter);
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

