const { RestaurantOwner, Restaurant, User, MenuItem, Category } = require("../database/associations")
const bcrypt = require("bcrypt");
const { cookie } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const Restaurent = {
    updateProfile: async (req, res) => {
        const { name, cuisineType, address, contactNumber, openingH, closingH, rating, firstName, lastName, email, password } = req.body;

        try {
            // 1. Check if the email is already taken
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser && existingUser.id !== req.user.id) {
                return res.status(400).json({ message: "Email is already taken by another user." });
            }

            // 2. Update the restaurant owner's name
            await RestaurantOwner.update(
                { firstName, lastName },
                { where: { id: req.user.id } }
            );

            // 3. Update the restaurant info
            await Restaurant.update(
                { name, cuisineType, address, contactNumber, openingH, closingH, rating },
                { where: { restaurantOwnerId: req.user.id } }
            );

            // 4. Update user info (excluding password for now)
            const updatedUser = await User.update(
                { email },
                { where: { id: req.user.id } }
            );

            // 5. If the password is provided, hash and update it
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10); // Assuming bcrypt is used for password hashing
                await User.update(
                    { password: hashedPassword },
                    { where: { id: req.user.id } }
                );
            }

            // Fetch the updated data for response
            const updatedRestaurantInfo = await Restaurant.findOne({ where: { restaurantOwnerId: req.user.id } });
            const updatedOwnerInfo = await RestaurantOwner.findOne({ where: { id: req.user.id } });

            // 6. Send the response with updated data
            res.status(200).json({
                restaurant: updatedRestaurantInfo,
                owner: updatedOwnerInfo,
                user: updatedUser
            });

        } catch (err) {
            console.log("Error:", err);
            res.status(500).send({ error: "Failed to update profile" });
        }
    },


    createItem: async (req, res) => {
        const { name, description, price, imageUrl, isAvailble, category } = req.body

        try {
            const resto = await RestaurantOwner.findOne({ where: { id: req.user.id }, include: { model: Restaurant } })
            if (resto) {
                const item = await MenuItem.create({ restaurantId: resto.Restaurants[0].id, name, description, price, imageUrl, isAvailble, category })
                res.status(200).send(item)
            }
            return;
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    updateItem: async (req, res) => {
        const { id } = req.params
        const { name, description, price, imageUrl, isAvailble, category } = req.body
        try {
            const ItemUpdated = await MenuItem.update({ name, description, price, imageUrl, isAvailble, category }, { where: { id } })
            res.status(200).send(ItemUpdated)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    deleteItem: async (req, res) => {
        const { id } = req.params
        try {
            await MenuItem.destroy({ where: { id } })
            res.status(200).send("deleted successfully")
        } catch (err) {
            console.log("errrrr", err)
            res.status(404).send("something wrong :(")
        }
    },
    addCategory: async (req, res) => {
        const { name } = req.body
        try {
            newCat = await Category.create({ name })
            res.status(200).send(newCat)
        } catch (err) {
            console.log("errr")
            res.status(400).send("something wrong")
        }
    },
    getAllItem: async (req, res) => {
        const { id } = req.params
        try {
            const result = await MenuItem.findAll({ where: { restaurantId: id } })
            res.status(200).send(result)
        } catch (err) {
            console.log("err", err)
            res.status(400).send("something wrong :(")
        }
    },
    CreateRestaurant: async (req, res) => {
        const Token = req.cookies.token
        console.log("your token", Token)
        if (!Token) {
            return res.status(401).send("Unauthorized: No token provided");
        }
        try {
            const decodedToken = jwt_decode.jwtDecode(Token) // Decode the token
            console.log("decodeddd", decodedToken)
            console.log("decodeddd with id", decodedToken.id)
            const { firstName, lastName, name, cuisineType, address, contactNumber, openingH, closingH } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !name || !cuisineType || !address || !contactNumber || !openingH || !closingH) {
                return res.status(400).send("All fields are required.");
            }

            // Create the restaurant owner
            const restOwner = await RestaurantOwner.create({
                firstName,
                lastName,
                userId: decodedToken.id, // Use the decoded userId
            });

            // Update the user role to 'restaurantOwner'
            await User.update(
                { role: "restaurantOwner" },
                { where: { id: decodedToken.id } } // Use the decoded userId to update the correct user
            );

            // Create the restaurant
            const resto = await Restaurant.create({
                name,
                cuisineType,
                address,
                contactNumber,
                openingH,
                closingH,
                restaurantOwnerId: restOwner.id, // Linking to the RestaurantOwner
            });

            // Create a JWT token for the restaurant owner
            const token = jwt.sign(
                { restaurantOwnerId: restOwner.id, role: "restaurantOwner" },
                "1234",
                { expiresIn: '7d' }
            );

            // Set the token in the cookie
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            // Respond with the created restaurant
            res.status(200).send(resto);
        } catch (err) {
            console.error(err);  // More detailed logging for errors
            res.status(500).send("An error occurred while creating the restaurant.")
        }
    },

    LoginRestoOwner: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('Login attempt - Email:', email);

            if (!email || !password) {
                console.log('Missing email or password');
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find the restaurant owner by email
            const resto = await User.findOne({
                where: {
                    email,
                    role: 'restaurantOwner'
                },
            });

            // Validate if the restaurant owner exists
            if (!resto) {
                console.log('No restaurant owner found with email:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const validate = await RestaurantOwner.findOne({ where: { userId: resto.id } });
            const retaurant = await Restaurant.findAll({ where: { restaurantOwnerId: validate.id }, include: [{ model: MenuItem }] })

            if (!validate) {
                console.log('No restaurant found for restaurant owner with email:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            console.log('Restaurant owner found, verifying password...');

            // Verify password using bcrypt.compare
            const isPasswordValid = await bcrypt.compare(password, resto.passwordHash);

            if (!isPasswordValid) {
                console.log('Password verification failed for:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            console.log('Password verification successful, generating token...', validate);
            const token = jwt.sign({ id: validate.id, role: validate.role }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            })
            // Set the token in a cookie
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
            });
            // Respond with a success message and user data
            res.status(200).json({ restaurantOwner: validate, resto: retaurant[0] });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined // Only show error details in development
            });
        }
    },
    // getallRestoOfOne: async (req, res) => {
    //     const Token = req.cookies.token
    //     try {
    //         const decoded = jwt_decode.jwtDecode(Token)
    //         console.log("hello", decoded)
    //         const result = await MenuItem.findAll({ where: { restaurantId: decoded.restoId } })
    //         res.status(200).send(result)
    //     }
    //     catch (err) {
    //         console.log("err", err)
    //         res.status(400).send(err)
    //     }
    // }
    // ,
    getRestoOwner: async (req, res) => {
        try {
            console.log("roleeeeeeee", req.user)
            const userOwner = await RestaurantOwner.findOne({ where: { id: req.user.id } })
            if (!userOwner) {
                return res.status(401).send({ error: "Unauthorized:ur not an owner" });
            }
            const owner = await RestaurantOwner.findOne({ where: { id: req.user.id }, include: [{ model: Restaurant, include: [{ model: MenuItem }] }] })
            res.send(owner);
        } catch (err) {
            console.log("err", err);
            res.status(400).send({ error: "Invalid or expired token" });
        }
    },
    getProfileInfos: async (req, res) => {
        console.log("resquest cookies", req.user)
        try {
            const userOwner = await RestaurantOwner.findOne({ where: { id: req.user.id } })
            if (!userOwner) {
                return res.status(401).send({ error: "Unauthorized:ur not an owner" });
            }
            const userInfos = await User.findOne({ where: { id: userOwner.userId } })
            res.status(200).send({ 'user': userInfos })
        } catch (err) {
            console.log("err", err)
            throw err
        }
    },
    getRestoInfo: async (req, res) => {
        console.log("resquest cookies", req.user)
        try {
            const userOwner = await RestaurantOwner.findOne({ where: { id: req.user.id }, include: { model: Restaurant } })
            if (!userOwner) {
                return res.status(401).send({ error: "Unauthorized:ur not an owner" });
            }
            res.status(200).send({ 'user': userOwner })
        } catch (err) {
            console.log("err", err)
            throw err
        }
    },
    logOutResto: (req, res) => {
        res.clearCookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            expires: new Date(0), // Immediately expires the cookie
            maxAge: 0,
        })
        res.send('Logged out successfully');
    },
}
module.exports = Restaurent
