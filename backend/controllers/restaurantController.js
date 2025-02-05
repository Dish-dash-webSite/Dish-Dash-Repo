const { Restaurant } = require('../database/associations');
const { Op } = require('sequelize'); // Sequelize operators for filtering

// Get all restaurants with filtering
exports.getAllRestaurants = async (req, res) => {
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
        const restaurants = await Restaurant.findAll({
            where: filter,
            attributes: ['id', 'name', 'address', 'cuisineType', 'contactNumber', 'operatingHours', 'rating'], // Only return necessary fields
        });

        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const { name, address, cuisineType, contactNumber, operatingHours, rating } = req.body;
        const newRestaurant = await Restaurant.create({
            name,
            address,
            cuisineType,
            contactNumber,
            operatingHours,
            rating
        });
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        await restaurant.update(req.body);
        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        await restaurant.destroy();
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

