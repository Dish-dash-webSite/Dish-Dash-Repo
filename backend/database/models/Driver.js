// Driver.js
module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Driver;
  };