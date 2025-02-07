// socket.js

const { Server } = require("socket.io");
const SocketController = require("../controllers/socketController");

const setupSocket = (httpServer, allowedOrigins) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  const socketController = new SocketController(io);

  io.on('connection', (socket) => {
    socketController.handleConnection(socket);
  });

  return io;
};

module.exports = setupSocket;
