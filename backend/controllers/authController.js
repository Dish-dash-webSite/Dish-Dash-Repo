// authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Customer } = require("../database/associations");
const { body, validationResult } = require("express-validator");

const AuthController = {
    register: [
        // Validation middleware
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
        body("role").isIn(["customer"]).withMessage("Invalid role"),
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("deliveryAddress").notEmpty().withMessage("Delivery address is required"),

        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
                }

                const { email, password, role, phoneNumber, firstName, lastName, deliveryAddress } = req.body;

                const existingUser = await User.findOne({ where: { email } });
                if (existingUser) return res.status(400).json({ message: "User already exists" });

                const passwordHash = await bcrypt.hash(password, 10);
                const user = await User.create({ email, passwordHash, role, phoneNumber });

                await Customer.create({
                    id: user.id,
                    firstName,
                    lastName,
                    deliveryAddress,
                    userId: user.id,
                });

                res.status(201).json({ message: "User registered successfully" });
            } catch (error) {
                console.error("Registration error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    ],

    login: [
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").notEmpty().withMessage("Password is required"),

        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
                }

                const { email, password } = req.body;
                const user = await User.findOne({ 
                    where: { email },
                    include: [{
                        model: Customer,
                        attributes: ['firstName', 'lastName', 'deliveryAddress']
                    }]
                });

                if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN }
                );


                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Strict",
                    maxAge: process.env.maxAge
                });


                res.json({
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        name: user.Customer ? `${user.Customer.firstName} ${user.Customer.lastName}` : '',
                        phoneNumber: user.phoneNumber || '',
                    },
                    token,
                    message: "Login successful"
                });
            } catch (error) {
                console.error("Login error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    ],

    logout: (req, res) => {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            expires: new Date(0),
            maxAge: 0,
        });
        res.json({ message: "Logged out successfully" });
    }
};

module.exports = AuthController;
