const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Customer, RestaurantOwner, Driver } = require("../database/associations");
const { body, validationResult } = require("express-validator");

// Utility function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

// ✅ Register User
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
    const { id } = req.user;
    try {
        console.log('Fetching profile for user:', id);
        const userData = await User.findOne({
            where: { id },
            attributes: ['id', 'email', 'role', 'phoneNumber'],
            include: [
                {
                    model: Customer,
                    attributes: ['firstName', 'lastName', 'deliveryAddress'],
                    required: false
                }
            ]
        });

        console.log('Raw user data:', JSON.stringify(userData, null, 2));

        // Flatten the response structure
        const response = {
            id: userData.id,
            email: userData.email,
            role: userData.role,
            phoneNumber: userData.phoneNumber,
            firstName: userData.Customer?.firstName || null,
            lastName: userData.Customer?.lastName || null,
            deliveryAddress: userData.Customer?.deliveryAddress || null
        };

        res.status(200).json(response);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};

// ✅ Update User (Protected)
exports.updateUser = async (req, res) => {
    const { id } = req.user;
    const { email, phoneNumber, address, website, firstName, lastName } = req.body;

    try {
        // Update user info
        const updatedUser = await User.update(
            { email, phoneNumber },
            { where: { id } }
        );

        // Update role-specific info
        let profileUpdate;
        if (req.user.role === 'customer') {
            profileUpdate = await Customer.update(
                { firstName, lastName, deliveryAddress },
                { where: { userId: id } }
            );
        } else if (req.user.role === 'restaurant_owner') {
            profileUpdate = await RestaurantOwner.update(
                { firstName, lastName },
                { where: { userId: id } }
            );
        }

        res.status(200).send({
            user: updatedUser,
            profile: profileUpdate
        });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send({ error: "Failed to update profile" });
    }
};

// ✅ Delete User (Protected)
exports.deleteUser = async (req, res) => {
    const { id } = req.user;
    try {
        await User.destroy({ where: { id } });
        res.status(200).send("Profile deleted successfully");
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send({ error: "Failed to delete profile" });
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

// ✅ Update User (Protected)
exports.updateProfile = async (req, res) => {
    const { id } = req.user;
    const { 
        email, 
        phoneNumber, 
        firstName, 
        lastName, 
        deliveryAddress 
    } = req.body;

    try {
        await User.update(
            { 
                email: email || undefined,
                phoneNumber: phoneNumber || undefined
            },
            { where: { id } }
        );

        // Update based on user role
        switch(req.user.role) {
            case 'customer':
                await Customer.update(
                    { 
                        firstName: firstName || undefined,
                        lastName: lastName || undefined,
                        deliveryAddress: deliveryAddress || undefined
                    },
                    { where: { userId: id } }
                );
                break;
            case 'restaurant_owner':
                await RestaurantOwner.update(
                    { 
                        firstName: firstName || undefined,
                        lastName: lastName || undefined
                    },
                    { where: { userId: id } }
                );
                break;
            case 'driver':
                await Driver.update(
                    { 
                        firstName: firstName || undefined,
                        lastName: lastName || undefined
                    },
                    { where: { userId: id } }
                );
                break;
        }

        // Fetch updated data using the getProfile logic
        return await this.getProfile(req, res);

    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

// ✅ Delete User (Protected)
exports.deleteProfile = async (req, res) => {
    const { id } = req.user;
    try {
        await User.destroy({ where: { id } });
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Failed to delete profile" });
    }
};
