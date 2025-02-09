const { DataTypes, Op } = require('sequelize');
const { connection } = require("./connection");

// Import models
const User = require('./models/User')(connection, DataTypes);
const Customer = require('./models/Customer')(connection, DataTypes);
const Restaurant = require('./models/Restaurant')(connection, DataTypes);
const Driver = require('./models/Driver')(connection, DataTypes);
const MenuItem = require('./models/MenuItem')(connection, DataTypes);
const Order = require('./models/Order')(connection, DataTypes);
const OrderItem = require('./models/OrderItem')(connection, DataTypes);
const Category = require('./models/Category')(connection, DataTypes);
const GeoLocation = require('./models/GeoLocation')(connection, DataTypes);
const Media = require('./models/media')(connection, DataTypes);
const RestaurantOwner = require("./models/restaurantOwner")(connection, DataTypes);
const Conversation = require('./models/Conversation')(connection, DataTypes);
const Message = require('./models/Message')(connection, DataTypes);
const Payment = require('./models/Payment')(connection, DataTypes);

// User Associations




//user associations
User.hasOne(Customer, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(RestaurantOwner, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Driver, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Customer Associations
Customer.belongsTo(User, { foreignKey: 'userId' });
Customer.hasMany(Order, { foreignKey: 'customerId', onDelete: 'CASCADE' });
Customer.hasMany(GeoLocation, { foreignKey: 'customerId', onDelete: 'CASCADE' });
Customer.hasMany(Conversation, { foreignKey: 'customerId', onDelete: 'CASCADE' });

// Restaurant Associations
Restaurant.belongsTo(RestaurantOwner, { foreignKey: 'restaurantOwnerId' });
Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
Restaurant.hasOne(GeoLocation, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });


// Restaurant Owner Associations
RestaurantOwner.belongsTo(User, { foreignKey: 'userId' });
RestaurantOwner.hasMany(Restaurant, { foreignKey: 'restaurantOwnerId', onDelete: 'CASCADE' });

// Driver Associations
Driver.belongsTo(User, { foreignKey: 'userId' });
Driver.hasMany(Order, { foreignKey: 'driverId', onDelete: 'CASCADE' });
Driver.hasMany(GeoLocation, { foreignKey: 'driverId', onDelete: 'CASCADE' });
Driver.hasMany(Conversation, { foreignKey: 'driverId', onDelete: 'CASCADE' });

// MenuItem Associations
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId', onDelete: 'CASCADE' });
MenuItem.belongsTo(Category, { foreignKey: 'categoryId' });

// Order Associations
Order.belongsTo(Customer, { foreignKey: 'customerId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Order.belongsTo(Driver, { foreignKey: 'driverId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
Order.hasOne(Payment, { foreignKey: 'orderId', onDelete: 'CASCADE' });

// OrderItem Associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

// Category Associations
Category.hasMany(MenuItem, { foreignKey: 'categoryId', onDelete: 'CASCADE' });;

// Media Associations
Media.belongsTo(User, { foreignKey: 'userId' });
Media.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Media.belongsTo(Driver, { foreignKey: 'driverId' });
Media.belongsTo(Customer, { foreignKey: 'customerId' });
Media.belongsTo(OrderItem, { foreignKey: 'orderItemId' });


// Conversation Associations
Conversation.belongsTo(Customer, { foreignKey: 'customerId' });
Conversation.belongsTo(Driver, { foreignKey: 'driverId' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', onDelete: 'CASCADE' });

// Message Associations
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

// Add User-Media association (inverse relationship)
User.hasMany(Media, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Payment Associations
Payment.belongsTo(Order, { foreignKey: 'orderId' });

// Sync all models with the database
// connection.sync({ alter: true }).then(() => {
//   console.log('Database & tables created!');
// });


module.exports = {
  User,
  Customer,
  Restaurant,
  Driver,
  MenuItem,
  Order,
  OrderItem,
  Category,
  GeoLocation,
  Media,
  RestaurantOwner,
  Conversation,
  Message,
  Payment,
  connection,
};