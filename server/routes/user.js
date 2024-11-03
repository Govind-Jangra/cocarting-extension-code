const express = require('express');
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const User = require('../models/users')(sequelize, Sequelize.DataTypes);

const router = express.Router();

// Create User
router.post('/', async (req, res) => {
    try {
        const {username,email,password}=req.body;
        const newUser = await User.create(
            {
                username,
                email,
                password
            }
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
