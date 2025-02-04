const jwt = require('jsonwebtoken');
const { User } = require('../database/associations');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const admin = await User.findOne({
            where: {
                id: decoded.id,
                role: 'admin'
            }
        });

        if (!admin) {
            return res.status(403).json({ 
                success: false,
                message: 'Admin access required' 
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false,
            message: 'Invalid token' 
        });
    }
};

module.exports = adminAuth; 