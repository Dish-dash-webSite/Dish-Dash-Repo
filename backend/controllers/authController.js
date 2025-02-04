// authController.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Generate JWT Token
exports.generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
};

// Verify JWT Token
exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
