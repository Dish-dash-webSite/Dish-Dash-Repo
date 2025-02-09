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
        // Clear any existing tokens first
        res.clearCookie('token');
        res.clearCookie('RestoToken');
        
        const Token = req.cookies.token;
        console.log("Initial token", Token);

        if (!Token) {
            return res.status(401).send("Unauthorized: No token provided");
        }

        try {
            const decodedToken = jwt_decode.jwtDecode(Token);
            console.log("Decoded token:", decodedToken);

            const { firstName, lastName, name, cuisineType, address, contactNumber, openingH, closingH } = req.body;
       
            // Validate required fields
            if (!firstName || !lastName || !name || !cuisineType || !address || !contactNumber || !openingH || !closingH) {
                return res.status(400).send("All fields are required.");
            }

            // Create the restaurant owner
            const restOwner = await RestaurantOwner.create({
                firstName,
                lastName,
                userId: decodedToken.id,
            });

            // Update the user role
            await User.update(
                { role: "restaurantOwner" },
                { where: { id: decodedToken.id } }
            );

            // Create the restaurant
            const resto = await Restaurant.create({
                name,
                cuisineType,
                address,
                contactNumber,
                openingH,
                closingH,
                restaurantOwnerId: restOwner.id,
            });

            // Generate new RestoToken
            const RestoToken = jwt.sign(
                { 
                    restaurantOwnerId: restOwner.id, 
                    role: "restaurantOwner",
                    userId: decodedToken.id 
                },
                "12345",
                { expiresIn: '7d' }
            );

            console.log("Generated new RestoToken:", RestoToken);

            // Clear old token and set new RestoToken
            res.clearCookie('token');
            res.cookie('RestoToken', RestoToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(200).send({
                success: true,
                restaurant: resto,
                token: RestoToken
            });
        } catch (err) {
            console.error("Error in CreateRestaurant:", err);
            res.status(500).send("An error occurred while creating the restaurant.");
        }
    },

    LoginRestoOwner: async (req, res) => {
        // Clear any existing tokens first
        res.clearCookie('token');
        res.clearCookie('RestoToken');

        try {
            const { email, password } = req.body;
            console.log('Login attempt - Email:', email);

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const resto = await User.findOne({
                where: {
                    email,
                    role: 'restaurantOwner'
                }
            });

            if (!resto) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const validate = await RestaurantOwner.findOne({ 
                where: { userId: resto.id } 
            });

            if (!validate) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, resto.passwordHash);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Generate new RestoToken
            const RestoToken = jwt.sign(
                { 
                    restaurantOwnerId: validate.id,
                    role: "restaurantOwner",
                    userId: resto.id
                },
                "12345",
                { expiresIn: '7d' }
            );

            console.log("Generated new RestoToken:", RestoToken);

            // Set the new RestoToken
            res.cookie('RestoToken', RestoToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: resto.id,
                    email: resto.email,
                    role: resto.role
                },
                token: RestoToken
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
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

        try {
       
    
        if (req.user.role!=="restaurantOwner") {
            return res.status(401).send({ error: "Unauthorized:ur not an owner" });
        }
   
        const owner = await User.findOne({where: {id:req.user.id},include:{model:RestaurantOwner,include:[{model:Restaurant}]}})
     res.send(owner);
        } catch (err) {
            console.log("err", err);
            res.status(400).send({ error: "Invalid or expired token" });
        }
    },
    logOutResto: (req, res) => {
        res.clearCookie('token');
        res.send('Logged out successfully');
    }

}
module.exports = Restaurent