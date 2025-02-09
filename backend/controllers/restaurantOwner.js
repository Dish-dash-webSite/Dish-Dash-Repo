const { RestaurantOwner, Restaurant, User, MenuItem, Category } = require("../database/associations")

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
    }
}
module.exports = Restaurent