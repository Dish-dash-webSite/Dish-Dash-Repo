const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const SocketController = require("./controllers/socketController");
const RestoRoter = require("./routes/restaurantRoutes.js")
const port = 3000;
const db = require("./database/connection.js");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const DriverRouter= require("./routes/driverRoutes.js");


const app = express();
const httpServer = createServer(app);

// Update CORS configuration
const allowedOrigins = ['http://localhost:5173','http://localhost:5174', 'http://localhost:5181'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Socket.IO setup with CORS
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

const socketController = new SocketController(io);

io.on('connection', (socket) => {
  socketController.handleConnection(socket);
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Use user routes
app.use('/api/users', userRoutes);

app.use("/api/resto", RestoRoter); // Add cookie parser

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/driver', DriverRouter);
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
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

