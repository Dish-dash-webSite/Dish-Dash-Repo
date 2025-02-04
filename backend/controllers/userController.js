const bcrypt = require('bcryptjs');
const { User, Customer } = require('../database/associations');
const authC = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

// Register User
exports.register = [
    // Validation middleware
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role').isIn(['customer']).withMessage('Invalid role'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('deliveryAddress').notEmpty().withMessage('Delivery address is required'),

    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
            }

            const { email, password, role, phoneNumber, firstName, lastName, deliveryAddress } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create user
            const user = await User.create({ email, passwordHash, role, phoneNumber });

            // Create customer with the user's ID
            const customer = await Customer.create({
                id: user.id,
                firstName,
                lastName,
                deliveryAddress,
                userId: user.id
            });

            res.status(201).json({
                message: 'User registered successfully',
                user,
                customer
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
];

// Login User
exports.login = [
    // Validation middleware
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
            }

            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            // Check password
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            // Generate JWT Token
            const token = authC.generateToken(user);

            res.json({ message: 'Login successful', token, user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
];

// Get Current User (Protected Route)
exports.getProfile = async (req, res) => {

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'Profile retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Update User (Protected)
exports.updateUser = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ email, phoneNumber });

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Delete User (Protected)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};