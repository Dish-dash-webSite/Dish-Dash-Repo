const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Importing Controllers and Routes
const SocketController = require("./controllers/socketController");
const RestoRouter = require("./routes/restaurantRoutes.js");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const DriverRouter = require("./routes/driverRoutes.js");
const messageRoutes = require('./routes/messageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Importing Database connection and Models
const db = require("./database/connection.js");
const { Conversation, Message } = require('./database/associations');
const categoryRoutes = require("./routes/categorieRoutes.js");
const setupTracking = require('./tracking');

const ownerRestoRoute = require("./routes/restaurantOwner.js")

// Create Express app
const app = express();

// Set up HTTP server and socket server
const httpServer = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const allowedOrigins = ['http://localhost:5174', 'https://your-production-domain.com'];
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5181'];

// Update CORS configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5181','http://localhost:5175'];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}));

// Socket.IO setup with CORS configuration
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

// Initialize SocketController
const socketController = new SocketController(io);

// Socket connection event
io.on("connection", (socket) => socketController.handleConnection(socket));

// Middleware for Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/resto', RestoRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/driver', DriverRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Simple socket event handling for conversation and messages
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('start-conversation', async (data) => {
    try {
      const [conversation] = await Conversation.findOrCreate({
        where: {
          customerId: data.customerId,
          driverId: data.driverId,
          orderId: data.orderId
        },
        include: [{
          model: Message,
          order: [['createdAt', 'ASC']]
        }]
      });

      socket.emit('conversation-started', {
        conversationId: conversation.id,
        messages: conversation.Messages || []
      });
    } catch (error) {
      console.error('Error creating conversation:', error);
      socket.emit('conversation-error', error.message);
    }
  });

  socket.on('send-chat-message', async (data) => {
    try {
      const message = await Message.create({
        content: data.content,
        senderId: data.senderId,
        senderType: data.senderType,
        conversationId: data.conversationId
      });

      io.emit('chat-message', {
        ...message.toJSON(),
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('message-error', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});



// Use routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/driver', DriverRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/category', categoryRoutes);
// ✅ Middleware
// ✅ CORS Configuration for Cookies
app.use("/api/owner", ownerRestoRoute)
// app.use('/api/driver', DriverRouter);
// ✅ Middleware
// ✅ CORS Configuration for Cookies

// Setup tracking for driver location updates
setupTracking(io);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start the server
const port = 3000;
httpServer.listen(port, () => {
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