const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclude password from the response
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ 
            where: { id: req.params.id },
            attributes: { exclude: ['password'] } // Exclude password from the response
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.id !== parseInt(req.params.id, 10) && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have authorization to update this user' });
        }

        const { name, email, password, role } = req.body;
        
        // Update fields if provided
        if (name) {
            user.name = name;
        }

        if (email) {
            // Check if email is already in use
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser && existingUser.id !== user.id) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = email;
        }

        if (password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if (role) {
            // Only allow admin users to change roles
            if (req.user && req.user.role === 'admin') {
                user.role = role;
            } else {
                return res.status(403).json({ message: 'Only admins can change user roles' });
            }
        }

        await user.save();

        // Return the updated user without the password
        const updatedUser = user.toJSON();
        delete updatedUser.password;

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedCount = await User.destroy({ where: { id: req.params.id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to delete user', details: error.message });
    }
};