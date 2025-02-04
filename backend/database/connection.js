
const { Sequelize } = require('sequelize');


const DB_NAME = process.env.DB_NAME ;
const DB_USER = process.env.DB_USER ;
const DB_PASSWORD = process.env.DB_PASSWORD ;
const DB_HOST = process.env.DB_HOST ;
const DB_DIALECT = process.env.DB_DIALECT ; 



console.log("DB_DIALECT:", process.env.DB_DIALECT); 



const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const testConnection = async () => {
  try {
    await connection.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect:", error);
  }
};

testConnection();

module.exports = { connection };
