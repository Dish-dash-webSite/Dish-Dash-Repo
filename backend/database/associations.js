const { DataTypes } = require('sequelize');
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
const Media = require('./models/Media')(connection, DataTypes);

// User Associations
User.hasOne(Customer, { foreignKey: 'userId' });
User.hasOne(Restaurant, { foreignKey: 'userId' });
User.hasOne(Driver, { foreignKey: 'userId' });

// Customer Associations
Customer.belongsTo(User, { foreignKey: 'userId' });
Customer.hasMany(Order, { foreignKey: 'customerId' });
Customer.hasMany(GeoLocation, { foreignKey: 'customerId' });

// Restaurant Associations
Restaurant.belongsTo(User, { foreignKey: 'userId' });
Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Restaurant.hasOne(GeoLocation, { foreignKey: 'restaurantId' });

// Driver Associations
Driver.belongsTo(User, { foreignKey: 'userId' });
Driver.hasMany(Order, { foreignKey: 'driverId' });
Driver.hasMany(GeoLocation, { foreignKey: 'driverId' });

// MenuItem Associations
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId' });
MenuItem.belongsTo(Category, { foreignKey: 'categoryId' });

// Order Associations
Order.belongsTo(Customer, { foreignKey: 'customerId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Order.belongsTo(Driver, { foreignKey: 'driverId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

// OrderItem Associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

// Category Associations
Category.hasMany(MenuItem, { foreignKey: 'categoryId' });

// Media Associations
Media.belongsTo(User, { foreignKey: 'userId' });
Media.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Media.belongsTo(Driver, { foreignKey: 'driverId' });
Media.belongsTo(Customer, { foreignKey: 'customerId' });
Media.belongsTo(OrderItem, { foreignKey: 'orderItemId' });

// Sync all models with the database
connection.sync({ alter: true });

// Export all models
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
};