const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); // Ensure you have your JWT_SECRET in a config file

const authenticateToken = (req, res, next) => {
    // Extract the token from the cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the decoded data to the request object
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
            driverId: decoded.driverId,
            customerId: decoded.customerId,
        };
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

module.exports = authenticateToken;