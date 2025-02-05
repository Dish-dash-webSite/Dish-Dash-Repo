const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies?.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser; // Attach user info to request
        next(); // Move to the next middleware
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Access denied. Invalid or expired token." });
    }
};
