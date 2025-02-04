module.exports = (sequelize, DataTypes) => {
  const GeoLocation = sequelize.define('GeoLocation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null
      references: {
        model: 'Customers', // Name of the referenced table
        key: 'id',
      },
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null
      references: {
        model: 'Restaurants', // Name of the referenced table
        key: 'id',
      },
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null
      references: {
        model: 'Drivers', // Name of the referenced table
        key: 'id',
      },
    },
  });

  return GeoLocation;
};