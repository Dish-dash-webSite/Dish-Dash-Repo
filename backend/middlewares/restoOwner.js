const { check, validationResult } = require('express-validator');

// Validation middleware
const validateLogin = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .notEmpty()
        .withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => err.msg)
            });
        }
        next();
    }
]

module.exports = validateLogin;

