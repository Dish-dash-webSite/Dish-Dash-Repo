// In your models/index.js or a similar file
const {DataTypes} = require('sequelize');
const connection =require("./connection");
const User = require('./models/User')(connection, DataTypes);
const Customer = require('./models/Customer')(connection, DataTypes);
const Restaurant = require('./models/Restaurant')(connection, DataTypes);
const Driver = require('./models/Driver')(connection, DataTypes);
const MenuItem = require('./models/MenuItem')(connection, DataTypes);
const Order = require('./models/Order')(connection, DataTypes);
const OrderItem = require('./models/OrderItem')(connection, DataTypes);
const Review = require('./models/Review')(connection, DataTypes);
const Category = require('./models/Category')(connection, DataTypes);
const ReviewFood = require('./models/ReviewFood')(connection, DataTypes);


// User Associations
User.hasOne(Customer, { foreignKey: 'userId' });
User.hasOne(Restaurant, { foreignKey: 'userId' });
User.hasOne(Driver, { foreignKey: 'userId' });

// Customer Associations
Customer.belongsTo(User, { foreignKey: 'userId' });
Customer.hasMany(Order, { foreignKey: 'customerId' });
Customer.hasMany(Review, { foreignKey: 'customerId' });

// Restaurant Associations
Restaurant.belongsTo(User, { foreignKey: 'userId' });
Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });

// Driver Associations
Driver.belongsTo(User, { foreignKey: 'userId' });
Driver.hasMany(Order, { foreignKey: 'driverId' });

// MenuItem Associations
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId' });
MenuItem.belongsTo(Category, { foreignKey: 'categoryId' });
MenuItem.hasMany(ReviewFood, { foreignKey: 'menuItemId' }); 

// Order Associations
Order.belongsTo(Customer, { foreignKey: 'customerId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Order.belongsTo(Driver, { foreignKey: 'driverId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

// OrderItem Associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

// Review Associations
Review.belongsTo(Customer, { foreignKey: 'customerId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

// ReviewFood Associations
ReviewFood.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

// Category Associations
Category.hasMany(MenuItem, { foreignKey: 'categoryId' }); 

// connection.sync({ alter: true })

module.exports = {
  User,
  Customer,
  Restaurant,
  Driver,
  MenuItem,
  Order,
  OrderItem,
  Review,
};