// driverController.js

const { Driver, User, Customer } = require('../database/associations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '1234';
const expiresIn = '10h';
const saltRounds = 10;

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, vehicleType, role, licenseNumber, deliveryAddress } = req.body;

        // Check input fields
        if (!firstName || !lastName || !email || !password || !phoneNumber || !vehicleType || !role || !licenseNumber || !deliveryAddress) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });

        // Check if user already exists
        if (existingUser) {
            const checkDriver = await Driver.findOne({ where: { userId: existingUser.id } });
            if (checkDriver) {
                return res.status(400).json({ error: "User already has a driver account" });
            }

            const checkCustomer = await Customer.findOne({ where: { userId: existingUser.id } });
            let newCustomer;
            if (!checkCustomer) {
                newCustomer = await Customer.create({ firstName, lastName, deliveryAddress, userId: existingUser.id });
            } else {
                newCustomer = await Customer.findOne({ where: { userId: existingUser.id } });
            }

            const newDriver = await Driver.create({ firstName, lastName, vehicleType, licenseNumber, userId: existingUser.id });

            const token = jwt.sign(
                { userId: existingUser.id, role: existingUser.role, driverId: newDriver.id, customerId: newCustomer.id },
                JWT_SECRET,
                { expiresIn }
            );

            return res.status(201).cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 10 * 24 * 60 * 60 * 1000,
            }).json({ message: "Register successful", login: "Login successful" });
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await User.create({ email, password: hashedPassword, phoneNumber, role });

            const newDriver = await Driver.create({ firstName, lastName, vehicleType, licenseNumber, userId: newUser.id });
            const newCustomer = await Customer.create({ firstName, lastName, deliveryAddress, userId: newUser.id });

            const token = jwt.sign(
                { userId: newUser.id, role: newUser.role, driverId: newDriver.id, customerId: newCustomer.id },
                JWT_SECRET,
                { expiresIn }
            );

            return res.status(201).cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 10 * 24 * 60 * 60 * 1000,
            }).json({ message: "Register successful", login: "Login successful" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

module.exports = { register };
