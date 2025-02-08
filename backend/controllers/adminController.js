const { User, Restaurant } = require('../database/associations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const adminController = {
    // Admin login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log('Login attempt - Email:', email);

            if (!email || !password) {
                console.log('Missing email or password');
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find admin user
            const admin = await User.findOne({
                where: {
                    email,
                    role: 'admin'
                }
            });

            if (!admin) {
                console.log('No admin found with email:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            console.log('Admin found, verifying password...');

            // Verify password using bcrypt.compare
            const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

            if (!isPasswordValid) {
                console.log('Password verification failed for:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            console.log('Password verified successfully');

            // Generate JWT token
            const token = jwt.sign(
                { id: admin.id, role: admin.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // Set token in cookie
            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 * 24 * 7
            });

            console.log('Login successful for:', email);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },


    // Logout
    logout: async (req, res) => {
        res.clearCookie('adminToken');
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    },

    // Admin registration
    // ... existing code ...

    // Admin registration
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Basic validation
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, email, and password are required'
                });
            }

            // Check if email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            // Hash password
            const passwordHash = await bcrypt.hash(password, saltRounds);

            // Create admin user
            const admin = await User.create({
                name,
                email,
                passwordHash,
                role: 'admin'
            });

            // Generate JWT token
            const token = jwt.sign(
                { id: admin.id, role: admin.role },
                "1234",
                { expiresIn: '7d' }
            );

            // Set token in cookie
            res.cookie('adminToken', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(201).json({
                success: true,
                message: 'Admin registered successfully',
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                }
            });

        } catch (error) {
            console.error('Admin registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


};

module.exports = adminController; 