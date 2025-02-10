const LocationController = require("./locationController");
const db = require('../database/associations');
const { Conversation, Message, Customer, Driver ,} = db;
const { Server } = require("socket.io");

class SocketController {
  constructor(io) {
    this.io = io;
    this.activeUsers = new Map(); // Store socket IDs for users
    this.activeOrders = new Map(); // Store active orders with phone numbers
  }

  handleConnection(socket) {
    console.log("Client connected:", socket.id);

    // Send immediate confirmation
    socket.emit("connection-success", { socketId: socket.id });

    socket.on("user-connect", async (data) => {
      console.log("User connected:", data);
      const { userId, userType } = data;
      this.activeUsers.set(userId, { socketId: socket.id, userType });
      socket.emit("user-connected", { userId, userType });
    });

    socket.on("driver-location-update", (data) => {
      const { driverId, lat, lng } = data;
      LocationController.updateDriverLocation(driverId, { lat, lng }, socket.id);

      // Broadcast updated driver location to all clients
      this.io.emit("live-driver-locations", LocationController.getDriverLocations());
    });

    socket.on("get-restaurants", () => {
      socket.emit("restaurant-locations", LocationController.getRestaurantLocations());
    });

    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("join-conversation", async ({ conversationId }) => {
      socket.join(`conversation-${conversationId}`);
    });

    socket.on("send-chat-message", async (data) => {
      try {
        const { conversationId, senderId, content, senderType } = data;
        console.log("Received message data:", data);

        // Save message to database
        const newMessage = await Message.create({
          conversationId,
          content,
          senderId,
          senderType,
        });
        console.log("Message saved:", newMessage);

        // Emit to all users in the conversation
        this.io.to(`conversation-${conversationId}`).emit("chat-message", {
          id: newMessage.id,
          content: newMessage.content,
          senderId: newMessage.senderId,
          senderType: newMessage.senderType,
          timestamp: newMessage.createdAt,
        });
        console.log("Message emitted to room:", `conversation-${conversationId}`);

      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("start-conversation", async (data) => {
      try {
        const { customerId, driverId } = data;
        console.log("Starting conversation with data:", data);

        if (!Conversation) {
          console.error("Conversation model is not defined");
          socket.emit("error", { message: "Server configuration error" });
          return;
        }

        // Create or find conversation
        const [conversation, created] = await Conversation.findOrCreate({
          where: {
            customerId,
            driverId,
          },
          defaults: {
            status: "active",
          },
        });

        console.log("Conversation created/found:", conversation.toJSON());

        // Join the room
        socket.join(`conversation-${conversation.id}`);

        // Get previous messages if any
        const messages = await Message.findAll({
          where: { conversationId: conversation.id },
          order: [["createdAt", "ASC"]],
        });

        // Emit conversation details back to client
        socket.emit("conversation-started", {
          conversationId: conversation.id,
          messages: messages,
        });

      } catch (error) {
        console.error("Error starting conversation:", error);
        socket.emit("error", { message: "Failed to start conversation" });
      }
    });

    socket.on("disconnect", () => {
      // Remove from active users
      for (const [userId, userData] of this.activeUsers.entries()) {
        if (userData.socketId === socket.id) {
          this.activeUsers.delete(userId);
          break;
        }
      }

      // Handle driver location removal
      for (const [driverId, loc] of LocationController.driverLocations.entries()) {
        if (loc.socketId === socket.id) {
          LocationController.removeDriver(driverId);
          break;
        }
      }

      // Notify all clients about the updated driver list
      this.io.emit("live-driver-locations", LocationController.getDriverLocations());
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on('join-order-tracking', ({ orderId, phoneNumber }) => {
      // Verify the order belongs to this phone number
      // This would typically involve checking against your database
      if (this.verifyOrderPhone(orderId, phoneNumber)) {
        socket.join(`order_${orderId}_${phoneNumber}`);
        
        // Simulate driver updates for testing
        this.simulateDriverUpdates(orderId, phoneNumber);
      }
    });
  }

  verifyOrderPhone(orderId, phoneNumber) {
    // In a real application, verify against your database
    // For testing, always return true
    return true;
  }

  simulateDriverUpdates(orderId, phoneNumber) {
    // Simulate driver movement for testing
    let lat = 36.8663;
    let lng = 10.1960;

    const interval = setInterval(() => {
      // Simulate movement by slightly changing coordinates
      lat += 0.0001;
      lng += 0.0001;

      this.io.to(`order_${orderId}_${phoneNumber}`).emit('driver-location-update', {
        lat,
        lng,
        driverId: 'test-driver',
        orderId,
        phoneNumber
      });
    }, 3000); // Update every 3 seconds

    // Store the interval to clear it later
    this.activeOrders.set(`${orderId}_${phoneNumber}`, interval);
  }
}

module.exports = SocketController;
