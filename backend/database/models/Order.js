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
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered'),
        defaultValue: 'pending',
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        defaultValue: 'pending',
      },
    }, {
      timestamps: true,
      paranoid: true
    });
  
    return Order;
  };