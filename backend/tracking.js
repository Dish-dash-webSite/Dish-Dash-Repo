const { Server } = require("socket.io");

function setupTracking(io) {
  io.on('connection', (socket) => {
    console.log('Tracking client connected:', socket.id);
    let interval;

    socket.on('join-order-tracking', (orderId) => {
      console.log('Client joined tracking for order:', orderId);
      
      // Clear any existing interval
      if (interval) {
        clearInterval(interval);
      }

      // Starting position (using coordinates for Islamabad)
      let lat = 33.6844; // Islamabad coordinates
      let lng = 73.0479;

      // Simulate driver location updates every 5 seconds
      interval = setInterval(() => {
        // Simulate movement by slightly changing coordinates
        lat += (Math.random() - 0.5) * 0.005; // Increased from 0.001 to 0.005
        lng += (Math.random() - 0.5) * 0.005;

        const location = {
          lat,
          lng,
          driverId: 'driver123',
          orderId: orderId, // Use the orderId from the client
        };
        
        socket.emit('driver-location-update', location);
      }, 5000);
    });

    socket.on('disconnect', () => {
      console.log('Tracking client disconnected:', socket.id);
      if (interval) {
        clearInterval(interval);
      }
    });
  });
}

module.exports = setupTracking; 