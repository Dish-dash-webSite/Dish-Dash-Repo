// driverRoutes.js
const  { register } = require('../controllers/driverController');
const DriverRouter = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware');

DriverRouter.post('/register', register);


module.exports= DriverRouter