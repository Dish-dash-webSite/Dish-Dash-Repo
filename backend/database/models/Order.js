// Order.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id',
        },
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
      },
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Drivers',
          key: 'id',
        },
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'prepared', 'out_for_delivery', 'delivered'),
        defaultValue: 'pending',
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
    });
  
    return Order;
  };