const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const socketController = require('./controllers/mapSocketController');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*", // Change this to match your frontend
      methods: ["GET", "POST"]
    }
  });
  

// Database connection

const SocketData={}
// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');


  socketController(socket);


});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});