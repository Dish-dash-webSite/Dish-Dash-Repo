const { connection,User,Order, Driver } = require('../database/associations'); // Import your connection instance and Driver model
const validator = require('validator')
const jwt = require('jsonwebtoken');

const registerDriver = async (req, res) => {
    const transaction = await connection.transaction(); // Start a transaction
    try {
        const { firstName, lastName, vehicleType, licenseNumber } = req.body;
        const userId = req.user.id; // Extract userId from middleware

        // Validation
        if (!userId || !firstName || !lastName || !vehicleType || !licenseNumber) {
            await transaction.rollback(); // Rollback transaction
            return res.status(401).json({ message: 'All fields are required' });
        }
        if (!validator.isNumeric(userId.toString())) {
            await transaction.rollback(); // Rollback transaction
            return res.status(400).json({ message: 'User ID must be a number' });
        }
        if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
            await transaction.rollback(); // Rollback transaction
            return res.status(400).json({ message: 'Names must contain only letters' });
        }
        if (validator.isEmpty(vehicleType)) {
            await transaction.rollback(); // Rollback transaction
            return res.status(402).json({ message: 'Vehicle type is required' });
        }
        if (!validator.isAlphanumeric(licenseNumber)) {
            await transaction.rollback(); // Rollback transaction
            return res.status(403).json({ message: 'License number must be alphanumeric' });
        }

        // Check if the user is already registered as a driver
        const existingDriver = await Driver.findOne({ where: { userId }, transaction });
        if (existingDriver) {
            await transaction.rollback(); // Rollback transaction
            return res.status(400).json({ message: 'User is already registered as a driver' });
        }

        // Create a new driver
        const newDriver = await Driver.create(
            { userId, firstName, lastName, vehicleType, licenseNumber },
            { transaction }
        );

        // Update the driver's role
        await Driver.update(
            { role: 'driver' },
            { where: { id: newDriver.id }, transaction }
        );

        // Generate a JWT token
        const driverToken = jwt.sign(
            { userId: newDriver.userId, driverId: newDriver.id },
            "12345",
            { expiresIn: '7d' }
        );

        // Set the token in a cookie
        res.cookie('auth_token', driverToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Commit the transaction
        await transaction.commit();

        // Return success response
        return res.status(201).json({
            message: 'Driver registered successfully',
            driver: newDriver,
        });
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const verifyDriver = async(req,res) =>{
    const userId = req.user?.id;
    try{
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const driver = await Driver.findOne({ where: { userId } });
        if (!driver) return res.status(404).json({isDriver:false});
       const currentDriver = await Driver.findOne({ where:{userId:userId}})
       if (!currentDriver) return res.status(400).json({message: "something went wrong"})
        res.status(200).json({isDriver:true, driver:driver});
    
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
}}

const fetchData = async (req, res) => {
    const userId = req.user.id;
    try{
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const user = await User.findOne({ id: userId})
        if (!user) return res.status(404).json({ message: 'Unauthorized' });
        const currentDriver = await Driver.findOne({ where:{userId:userId}});
        if (!currentDriver) return res.status(400).json({message: "something went wrong"})
        const Delivered = await Order.findAll({ where:{status:'delivered',driverId:currentDriver.id}})
        const available = await Order.findAll({ where:{status:'prepared',driverId:currentDriver.id}})
        let number=0;
        let numberOfDelivered = 0;
        if(available){
            number=available.length;
        }
        if(Delivered){
            numberOfDelivered=Delivered.length;
        }
        res.status(200).json({isDriver:true, driver:currentDriver,balance:user.balance,Delivered:numberOfDelivered,available:number});
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });  }
    }


module.exports = { registerDriver ,verifyDriver,fetchData};
