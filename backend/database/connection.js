const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

 // Debugging: Ensure it's loaded


const DB_NAME = process.env.DB_NAME||"localhost";
const DB_USER = process.env.DB_USER||"root";
const DB_PASSWORD = process.env.DB_PASSWORD||"root";
const DB_HOST = process.env.DB_HOST || "localhost";
// const DB_DIALECT = "mysql";

// console.log("DB_DIALECT:", DB_DIALECT); // Debugging: Log the DB_DIALECT

// Initialize Sequelize with the database credentials
const connection = new Sequelize("dish_dash", "root", "root", {
  host: "localhost",
  dialect:"mysql", // Ensure this is a string like 'mysql'
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Function to test the database connection
const testConnection = async () => {
  try {
    await connection.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect:", error);
  }
};

// Test the connection
testConnection();

// Export the connection object for use in other parts of the application
module.exports = { connection };