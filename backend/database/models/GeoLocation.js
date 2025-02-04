// GeoLocation.js
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
    });
  
    return GeoLocation;
  };