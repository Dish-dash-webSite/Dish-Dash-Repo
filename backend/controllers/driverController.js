// driverController.js

const { Driver,Order, User, Customer } = require('../database/associations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '1234';
const expiresIn = '10h';
const saltRounds = 10;
const validator = require('validator'); 

const registerDriver = async (req, res) => {
    try {
      const { firstName, lastName, vehicleType, licenseNumber } = req.body;
  
      // Validate input
      if (!userId || !firstName || !lastName || !vehicleType || !licenseNumber) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (!validator.isNumeric(userId.toString())) {
        return res.status(400).json({ message: 'User ID must be a number' });
    }

    // Validate firstName and lastName are alphabetic
    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
        return res.status(400).json({ message: 'First name and last name must contain only letters' });
    }

    // Validate vehicleType is not empty
    if (validator.isEmpty(vehicleType)) {
        return res.status(400).json({ message: 'Vehicle type is required' });
    }

    // Validate licenseNumber is alphanumeric
    if (!validator.isAlphanumeric(licenseNumber)) {
        return res.status(400).json({ message: 'License number must be alphanumeric' });
    }

  
      const existingDriver = await Driver.findOne({ where: { userId } });
      if (existingDriver) {
        return res.status(400).json({ message: 'User is already registered as a driver' });
      }
  
      // Create a new driver record
      const newDriver = await Driver.create({
        userId,
        firstName,
        lastName,
        vehicleType,
        licenseNumber,
      });

      const token = jwt.sign(
        { userId: newDriver.userId, driverId: newDriver.id },
        "1234",
        { expiresIn: '7d' }
      );
  
      // Set cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      return res.status(201).json({ message: 'Driver registered successfully', driver: newDriver });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getDriverDetails = (req,res)=>{
    
  }
  module.exports = registerDriver;

// const getOrdersDelivered = (req, res) => {
//     try {
//         const driverId = req.user.driverId;
//         Order.findAll({ where: { driverId, status: 'delivered' } })
//             .then(orders => {
//                 res.status(200).json(orders);
//             })
//             .catch(err => {
//                 res.status(500).json({ error: err.message || "Internal Server Error" });
//             });
//     } catch (err) {
//         res.status(500).json({ error: err.message || "Internal Server Error" });
//     }
// }


module.exports = { registerDriver };
