// driverRoutes.js
const { registerDriver ,fetchData, verifyDriver } = require('../controllers/driverController');
const DriverRouter = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware');

DriverRouter.post('/register',authMiddleware, registerDriver);
DriverRouter.post('/verifyDriver',authMiddleware, verifyDriver);

DriverRouter.post('/dashboard',authMiddleware, fetchData);

module.exports = DriverRouter