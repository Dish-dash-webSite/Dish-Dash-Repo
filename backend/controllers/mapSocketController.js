// controllers/socketController.js
const { Op } = require('sequelize');
const { GeoLocation, Order,Restaurant } = require('../database/associations');

const socketController = (socket) => {
  console.log('a user connected', socket.id);
  socket.emit("connection-success", { socketId: socket.id });

  const fetchInitialData = async () => {
    try {
      const locations = await GeoLocation.findAll({
        where: {
          restaurantId: { [Op.ne]: null }
        },
        attributes: ['id', 'latitude', 'longitude']
      });

      socket.emit("initialData", locations);
    } catch (error) {
      console.error('Error fetching geo-locations:', error);
      socket.emit("error", { message: 'Internal Server Error' });
    }
  };

  const fetchOrders = async () => {
    try {
      const orders = await Order.findAll({
        
        attributes: ['id', 'restaurantId', 'customerId', 'totalAmount', 'deliveryAddress', 'paymentStatus']
      });
  
      // Emit orders for each restaurant
      socket.emit("ordersForAllRestaurants", orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      socket.emit("error", { message: 'Internal Server Error' });
    }
  };
  

  const fetchRestoById = async (data) => {
    const { id } = data; // Destructure to get id from data
    try {
      const resto = await Restaurant.findByPk(id);
      const { name } = resto; // Destructure to get only the name property
      socket.emit("restoById", name); // Emit only the name
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      socket.emit("error", { message: 'Internal Server Error' });
    }
  };
  

  // Handle disconnection
  const handleDisconnect = () => {
    console.log('user disconnected');
  };

  // Attach event listeners
  socket.on('fetchInitialData', fetchInitialData);
  socket.on('fetchOrders', fetchOrders);  // Listen to fetchOrders event
  socket.on('fetchRestoById', fetchRestoById);
  socket.on('disconnect', handleDisconnect);
};

module.exports = socketController;
