// driverRoutes.js
const { registerDriver } = require('../controllers/driverController');
const DriverRouter = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware');

DriverRouter.post('/register',authMiddleware, registerDriver);


module.exports = DriverRouter