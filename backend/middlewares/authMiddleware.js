const jwt = require("jsonwebtoken");
const { User } = require("../database/associations");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Authentication failed" });
    }
};
