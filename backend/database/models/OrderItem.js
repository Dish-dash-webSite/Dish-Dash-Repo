// OrderItem.js
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      menuItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MenuItems',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceAtTimeOfOrder: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return OrderItem;
  };