<<<<<<< HEAD
const { Op } = require('sequelize'); // Sequelize operators for filtering
const { User, RestaurantOwner } = require('../database/associations');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const saltRounds = 10;

const RestoController = {
    // Admin login
    // login: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;

    //         console.log('Login attempt - Email:', email);

    //         if (!email || !password) {
    //             console.log('Missing email or password');
    //             return res.status(400).json({
    //                 success: false,
    //                 message: 'Email and password are required'
    //             });
    //         }

    //         // Find admin user
    //         const resto = await User.findOne({
    //             where: {
    //                 email,
    //                 role: 'restaurantOwner'
    //             }
    //         });

    //         if (!resto) {
    //             console.log('No resto found with email:', email);
    //             return res.status(401).json({
    //                 success: false,
    //                 message: 'Invalid credentials'
    //             });
    //         }

    //         console.log('resto found, verifying password...');

    //         // Verify password using bcrypt.compare
    //         const isPasswordValid = await bcrypt.compare(password, resto.passwordHash);

    //         if (!isPasswordValid) {
    //             console.log('Password verification failed for:', email);
    //             return res.status(401).json({
    //                 success: false,
    //                 message: 'Invalid credentials'
    //             });
    //         }

    //         console.log('Password verified successfully');

    //         // Generate JWT token
    //         const token = jwt.sign(
    //             { id: resto.id, role: resto.role },
    //             '1234',
    //             { expiresIn: '24h' }
    //         );

    //         // Set token in cookie
    //         res.cookie('restoToken', token, {
    //             httpOnly: true,
    //             secure: 'production',
    //             sameSite: 'strict',
    //             maxAge: 3600000 * 24 * 7
    //         });

    //         console.log('Login successful for:', email);

    //         res.status(200).json({
    //             success: true,
    //             message: 'Login successful',
    //             user: {
    //                 id: resto.id,
    //                 email: resto.email,
    //                 role: resto.role
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         res.status(500).json({
    //             success: false,
    //             message: 'Internal server error',
    //             error: 'development' ? error.message : undefined
    //         });
    //     }
    // },


    // // Logout
    // logout: async (req, res) => {
    //     res.clearCookie('adminToken');
    //     res.status(200).json({
    //         success: true,
    //         message: 'Logged out successfully'
    //     });
    // },

    // // Admin registration
    // // ... existing code ...

    // // Admin registration
    // register: async (req, res) => {
    //     try {
    //         const { name, email, password } = req.body;

    //         // Basic validation
    //         if (!name || !email || !password) {
    //             return res.status(400).json({
    //                 success: false,
    //                 message: 'Name, email, and password are required'
    //             });
    //         }

    //         // Check if email already exists
    //         const existingResto = await User.findOne({ where: { email, role: "restaurantOwner" } });
    //         if (existingResto) {
    //             return res.status(409).json({
    //                 success: false,
    //                 message: 'Email already exists'
    //             });
    //         }

    //         // Hash password
    //         const passwordHash = await bcrypt.hash(password, saltRounds);

    //         // Create admin user
    //         const resto = await User.create({
    //             name,
    //             email,
    //             passwordHash,
    //             role: "restaurantOwner"
    //         });

    //         // Generate JWT token
    //         const token = jwt.sign(
    //             { id: resto.id, role: resto.role },
    //             "1234",
    //             { expiresIn: '7d' }
    //         );
    //         console.log("this is your token", token)
    //         // Set token in cookie
    //         res.cookie('RestToken', token, {
    //             httpOnly: true,
    //             sameSite: 'strict',
    //             maxAge: 7 * 24 * 60 * 60 * 1000
    //         });

    //         res.status(201).json({
    //             success: true,
    //             message: 'RestoOwner registered successfully',
    //             user: {
    //                 id: resto.id,
    //                 name: resto.name,
    //                 email: resto.email,
    //                 role: resto.role
    //             }
    //         });

    //     } catch (error) {
    //         console.error('Resto registration error:', error);
    //         res.status(500).json({
    //             success: false,
    //             message: 'Internal server error',
    //         });
    //     }
    // },
    CrateRestaurant: async (req, res) => {
        const { name, cuisineType, address, contactNumber, openingH, closingH, rating } = req.body
        try {
<<<<<<< HEAD
            const restaurant = await Restaurant.create({ name, cuisineType, address: address, contactNumber, openingH, closingH, rating, restaurantOwnerId: 2 })
=======
            const restaurant = await RestaurantOwner.create({ name, cuisineType, address: address, contactNumber, openingH, closingH, rating, userId: 5, restaurantOwnerId: 5 })
>>>>>>> 72ea97b27ec8b10d4adf4f362b6044c8ecfc81d7
            res.status(200).send({ message: { restaurant } })
        } catch (err) {
            console.log("err", err)
            res.status(404).send(err)
        }
    },deleteRestaurant : async (req, res) => {
        try {
            const restaurant = await RestaurantOwner.findByPk(req.params.id);
            if (!restaurant) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }

            await restaurant.destroy();
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateRestaurant : async (req, res) => {
        try {
            const restaurant = await RestaurantOwner.findByPk(req.params.id);
            if (!restaurant) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }
            await restaurant.update(req.body);
            res.status(200).json(restaurant);

        } catch (error) {
            console.error('Error updating restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getRestaurantById : async (req, res) => {
        try {
            const restaurant = await RestaurantOwner.findByPk(req.params.id);
            if (!restaurant) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }

            res.status(200).json(restaurant);
        } catch (error) {
            console.error('Error fetching restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllRestaurants : async (req, res) => {
        try {
            const { rating, cuisineType, name } = req.query;
            let filter = {};
    
            // Filter by rating (minimum rating)
            if (rating) {
                filter.rating = { [Op.gte]: parseFloat(rating) };
            }
    
            // Filter by cuisine type (case-insensitive)
            if (cuisineType) {
                filter.cuisineType = { [Op.iLike]: `%${cuisineType}%` };
            }
    
            // Search by name (case-insensitive)
            if (name) {
                filter.name = { [Op.iLike]: `%${name}%` };
            }
    
            // Fetch restaurants with filtering
            const restaurants = await RestaurantOwner.findAll({
                where: filter,
                attributes: ['id', 'name', 'address', 'cuisineType', 'contactNumber', 'operatingHours', 'rating'], // Only return necessary fields
            });

    
            res.status(200).json(restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

};

module.exports = RestoController; 
// Get a single restaurant by ID
// Create a new restaurant
// exports.createRestaurant = async (req, res) => {
//     try {
//         const { name, address, cuisineType, contactNumber, operatingHours, rating } = req.body;
//         const newRestaurant = await Restaurant.create({
//             name,
//             address,
//             cuisineType,
//             contactNumber,
//             operatingHours,
//             rating
//         });
//         res.status(201).json(newRestaurant);
//     } catch (error) {
//         console.error('Error creating restaurant:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
=======
// restaurantController.js
>>>>>>> a3b43b85a59a1d862da71c0b2daccab2c00686e9
