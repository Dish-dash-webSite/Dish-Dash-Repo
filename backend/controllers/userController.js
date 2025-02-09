const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Customer } = require("../database/associations");
const { body, validationResult } = require("express-validator");

// Utility function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

// ✅ Register User
exports.register = [
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

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) return res.status(400).json({ message: "User already exists" });

            // 🔥 Fix: Ensure we store `passwordHash` instead of `password`
            const passwordHash = await bcrypt.hash(password, 10);

            // ✅ Create user with correct password field
            const user = await User.create({ email, passwordHash, role, phoneNumber });

            // ✅ Create customer entry with linked user ID
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
            res.status(500).json({ message: "Internal server error", error });
        }
    },
];


// ✅ Login User
exports.login = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Validation failed", errors: errors.array() });
            }

            const { email, password } = req.body;

            // Find user with debug logging
            const user = await User.findOne({
                where: { email },
                include: [{
                    model: Customer,
                    attributes: ['firstName', 'lastName', 'deliveryAddress']
                }]
            });

            console.log('Login attempt:', { email, userFound: !!user });

            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            console.log('Password match:', isMatch);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate JWT Token
            const token = generateToken(user);

            // Set HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
            });

            // Format user data to match frontend expectations
            const userData = {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.Customer ? `${user.Customer.firstName} ${user.Customer.lastName}` : '',
                phoneNumber: user.phoneNumber || '',
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            // Send response matching AuthResponse type
            res.json({
                user: userData,
                token: token,
                message: "Login successful"
            });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];

// ✅ Get Current User (Protected Route)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Remove password before sending response
        const { password: _, ...userData } = user.toJSON();
        res.json({ message: "Profile retrieved successfully", user: userData });
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Update User (Protected)
exports.updateUser = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.update({ email, phoneNumber });

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Delete User (Protected)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Logout User
exports.logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(0), // Immediately expires the cookie
        maxAge: 0,
    });
    res.json({ message: "Logged out successfully" });
};
