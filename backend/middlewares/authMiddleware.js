const jwt = require('jsonwebtoken');
const authC = require('../controllers/authController');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

    // Check if token is in "Bearer <token>" format
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. Invalid token format.' });

    try {
        const verified = authC.verifyToken(token);
        req.user = verified; // Add user info to request
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message); // Log the error for debugging
        res.status(401).json({ message: 'Access denied. Invalid or expired token.' });
    }
};
