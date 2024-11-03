const express = require('express');
const router = express.Router();
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const CocartProduct = require('../models/cocart_products')(sequelize, Sequelize.DataTypes);
const Product = require('../models/products')(sequelize, Sequelize.DataTypes);

router.delete('/:product_id', async (req, res) => {
    const { product_id } = req.params;

    try {
        // Find the product
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Delete the product
        await product.destroy();

        // Check if the product is associated with a cocart and delete the association
        const cocartProduct = await CocartProduct.findOne({ where: { product_id } });
        if (cocartProduct) {
            await cocartProduct.destroy();
        }

        res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;