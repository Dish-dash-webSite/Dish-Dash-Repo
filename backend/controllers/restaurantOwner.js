const { RestaurantOwner, Restaurant, User, MenuItem, Category } = require("../database/associations")
const bcrypt = require("bcrypt");
const { cookie } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const Restaurent = {
    updateProfile: async (req, res) => {
        const { name, cuisineType, address, contactNumber, openingH, closingH, rating, firstName, lastName } = req.body;
        const { id } = req.params;

        try {
            // Update restaurant info
            const updatedRestaurant = await Restaurant.update(
                { name, cuisineType, address, contactNumber, openingH, closingH, rating },
                { where: { restaurantOwnerId: id } }
            );

            // Update restaurant owner info
            const updatedOwner = await RestaurantOwner.update(
                { firstName, lastName },
                { where: { id } }
            );
            const updateduser = await User.update(
                { email, password },
                { where: { id } }
            )

            // Send response with both updates
            res.status(200).send({
                restaurant: updatedRestaurant,
                owner: updatedOwner,
                user: updateduser

            });
        } catch (err) {
            console.log("Error:", err);
            res.status(500).send({ error: "Failed to update profile" });
        }
    },
    createItem: async (req, res) => {
        const { id, name, description, price, imageUrl, isAvailble, category } = req.body
        try {
            const item = await MenuItem.create({ restaurantId: id, name, description, price, imageUrl, isAvailble, category })
            res.status(200).send(item)
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
            const RestoToken = jwt.sign(
                { restaurantOwnerId: restOwner.id, role: "restaurantOwner" },
                "12345",
                { expiresIn: '7d' }
            );

            // Set the token in the cookie
            res.cookie('RestoToken', RestoToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            // Respond with the created restaurant
            res.status(200).send(resto);
        } catch (err) {
            console.error(err);  // More detailed logging for errors
            res.status(500).send("An error occurred while creating the restaurant.");
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
                }
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

            console.log('Password verification successful, generating token...');
            const RestoToken = jwt.sign(
                { restaurantOwnerId: validate.id },  // Changed to use `resto` object
                "12345",  // Secret key - you should store this securely
                { expiresIn: '7d' }
            );

            // Set the token in a cookie
            res.cookie('RestoToken', RestoToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
            });

            // Respond with a success message and user data
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: resto.id,
                    email: resto.email,
                    role: resto.role
                }
            });
        } catch (error) {
            console.error('Login error:', error);

            // Respond with error status and message
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined // Only show error details in development
            });
        }
    },
    getallRestoOfOne: async (req, res) => {
        const Token = req.cookies.RestoToken
        try {
            const decoded = jwt_decode.jwtDecode(Token)
            console.log("hello", decoded)
            const result = await MenuItem.findAll({ where: { restaurantId: decoded.restoId } })
            res.status(200).send(result)
        }
        catch (err) {
            console.log("err", err)
            res.status(400).send(err)
        }
    }
    ,
    getRestoOwner: async (req, res) => {
        const Token = req.cookies.RestoToken
        console.log("tokennnnnnnnnnn", Token)
        try {
            const decoded = jwt.verify(Token, "12345")
            console.log("hello", decoded)
            // const result = await Restaurant.findOne({ where: { id: decoded.restoId } })
            // const Owner = await RestaurantOwner.findOne({ where: { id: result.restaurantOwnerId } })
            // const user = await User.findOne({ where: { id: Owner.userId } })
            res.status(200).send(decoded)
        }
        catch (err) {
            console.log("err", err)
            res.status(400).send(err)
        }
    },
    logOutResto: (req, res) => {
        res.clearCookie('token');
        res.send('Logged out successfully');
    }

}
module.exports = Restaurent