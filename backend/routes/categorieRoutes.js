const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorieContoller');

// Create a new category
router.post('/add', categoryController.createCategory);

// Get all categories
router.get('/categories', categoryController.getAllCategories);

// Get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category
router.put('/:id', categoryController.updateCategory);

// Delete a category
router.delete('/:id', categoryController.deleteCategory);

// Search categories by name and cuisineType


module.exports = router;