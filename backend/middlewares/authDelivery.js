const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '1234';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) return res.status(401).json({ message: 'Unauthorized, no token provided' });

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });
            req.user = decoded; // Attach user data to request object
            next();
        });
    } catch (error) {
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = authMiddleware;
