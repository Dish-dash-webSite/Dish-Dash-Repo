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
const messageRoutes = require('./routes/messageRoutes');
const { Conversation, Message } = require('./database/associations');
const categoryRoutes = require("./routes/categorieRoutes.js");



const app = express();
const httpServer = createServer(app);
// const allowedOrigins = ['http://localhost:5174', 'https://your-production-domain.com'];
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5181'];

// Update CORS configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5181'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
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

// Simple socket event handlers with console.logs
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

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/resto', RestoRoter);
app.use('/api/admin', adminRoutes);
app.use('/api/driver', DriverRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/category', categoryRoutes);
// ✅ Middleware
// ✅ CORS Configuration for Cookies

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start Server
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