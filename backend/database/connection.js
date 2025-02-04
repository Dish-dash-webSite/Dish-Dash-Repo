const { Sequelize } = require('sequelize');

const config = require('../config/database.js');

// Load environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = config;
console.log("DB_NAME",config.DB_NAME)

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  // logging:false , 
  pool: {
    max: 10,
    min: 0,  
    acquire: 30000, 
    idle: 10000, 
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection()
module.exports = {
  sequelize,
};