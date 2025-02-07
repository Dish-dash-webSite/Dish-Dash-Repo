const db = require('../database/associations');
const { Conversation, Message, Customer, Driver } = db;

class SocketController {
  constructor(io) {
    this.io = io;
    this.activeUsers = new Map(); // Store socket IDs for users
  }

  handleConnection(socket) {
    console.log('Client connected:', socket.id);

    // Send immediate confirmation
    socket.emit('connection-success', { socketId: socket.id });

    socket.on('user-connect', async (data) => {
      console.log('User connected:', data);
      const { userId, userType } = data;
      this.activeUsers.set(userId, { socketId: socket.id, userType });
      socket.emit('user-connected', { userId, userType });
    });

    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on('join-conversation', async ({ conversationId }) => {
      socket.join(`conversation-${conversationId}`);
    });

    socket.on('send-chat-message', async (data) => {
      try {
        const { conversationId, senderId, content, senderType } = data;
        console.log('Received message data:', data); // Debug log

        // Save message to database
        const newMessage = await Message.create({
          conversationId,
          content,
          senderId,
          senderType
        });
        console.log('Message saved:', newMessage); // Debug log

        // Emit to all users in the conversation
        this.io.to(`conversation-${conversationId}`).emit('chat-message', {
          id: newMessage.id,
          content: newMessage.content,
          senderId: newMessage.senderId,
          senderType: newMessage.senderType,
          timestamp: newMessage.createdAt
        });
        console.log('Message emitted to room:', `conversation-${conversationId}`); // Debug log

      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('start-conversation', async (data) => {
      try {
        const { customerId, driverId } = data;
        console.log('Starting conversation with data:', data);

        // Verify Conversation model is available
        if (!Conversation) {
          console.error('Conversation model is not defined');
          socket.emit('error', { message: 'Server configuration error' });
          return;
        }

        // Create or find conversation without orderId
        const [conversation, created] = await Conversation.findOrCreate({
          where: {
            customerId,
            driverId
          },
          defaults: {
            status: 'active'
          }
        });

        console.log('Conversation created/found:', conversation.toJSON());

        // Join the room
        socket.join(`conversation-${conversation.id}`);

        // Get previous messages if any
        const messages = await Message.findAll({
          where: { conversationId: conversation.id },
          order: [['createdAt', 'ASC']]
        });

        // Emit conversation details back to client
        socket.emit('conversation-started', {
          conversationId: conversation.id,
          messages: messages
        });

      } catch (error) {
        console.error('Error starting conversation:', error);
        socket.emit('error', { message: 'Failed to start conversation' });
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Client disconnected:', socket.id, 'Reason:', reason);
      // Remove from active users
      for (const [userId, userData] of this.activeUsers.entries()) {
        if (userData.socketId === socket.id) {
          this.activeUsers.delete(userId);
          break;
        }
      }
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }
}

module.exports = SocketController;
