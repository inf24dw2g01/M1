const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/adminAuth');

// Get all users (admin only)
router.get('/', authenticate, isAdmin, usersController.getAllUsers);

// Get user by ID
router.get('/:id', authenticate, isAdmin, usersController.getUserById);

// Update user
router.put('/:id', authenticate, usersController.updateUser);

// Delete user (admin only)
router.delete('/:id', authenticate, isAdmin, usersController.deleteUser);

module.exports = router;