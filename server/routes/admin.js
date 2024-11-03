const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const User = require('../models/users')(sequelize, Sequelize.DataTypes);
const Cocart = require('../models/cocarts')(sequelize, Sequelize.DataTypes);
const CocartProduct = require('../models/cocart_products')(sequelize, Sequelize.DataTypes);
const Product = require('../models/products')(sequelize, Sequelize.DataTypes);


// Fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user email
router.put('/users/:id/email', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.email = email;
        await user.save();
        res.json({ message: "User email updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Fetch all cocarts
router.get('/cocarts', async (req, res) => {
    try {
        const cocarts = await Cocart.findAll();
        res.json(cocarts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch active cocarts (top N)
router.get('/cocarts/active', async (req, res) => {
    try {
        const top = parseInt(req.query.top) || 10;
        const cocarts = await Cocart.findAll({
            where: { active: true },
            limit: top
        });
        res.json(cocarts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch specific cocart by ID
router.get('/cocarts/:id', async (req, res) => {
    try {
        const cocart = await Cocart.findByPk(req.params.id);
        if (!cocart) return res.status(404).json({ error: "Cocart not found" });
        res.json(cocart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete cocart by ID
router.delete('/cocarts/:id', async (req, res) => {
    try {
        const cocart = await Cocart.findByPk(req.params.id);
        if (!cocart) return res.status(404).json({ error: "Cocart not found" });

        await CocartProduct.destroy({ where: { cocart_id: req.params.id } });
        await cocart.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Fetch all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch specific product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        await CocartProduct.destroy({ where: { product_id: req.params.id } });
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
