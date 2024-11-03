const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const Cocart = require('../models/cocarts')(sequelize, Sequelize.DataTypes);
const CocartProduct = require('../models/cocart_products')(sequelize, Sequelize.DataTypes);
const Product = require('../models/products')(sequelize, Sequelize.DataTypes);
const ProductImage = require('../models/product_images')(sequelize, Sequelize.DataTypes);

// add product to the cocart
router.post('/', async (req, res) => {
    const { cocart_id, product } = req.body;

    try {
        // Find cocart
        const cocart = await Cocart.findByPk(cocart_id);
        console.log("-----------cocart", cocart);
        if (!cocart) {
            return res.status(404).json({ error: "Cocart not found" });
        }

        // Create the product
        const newProduct = await Product.create({
            name: product.name,
            original_price: product.original_price,
            price: product.price,
            slug: product.slug,
            added_by: product.added_by,
            customer_rating: product.customer_rating,
            product_tracking_url: product.product_tracking_url,
        });

        console.log("-----------newProduct", newProduct);

        // Add the product image
        const newProductImage = await ProductImage.create({
            product_id: newProduct.id,
            image: product.image,
        });
        console.log("-----------newProductImage", newProductImage);

        // Add the product to the cocart
        const newCocartProduct = await CocartProduct.create({
            cocart_id,
            product_id: newProduct.id,
            note: req.body.note || null,
        });
        console.log("-----------newCocartProduct", newCocartProduct);

        res.status(201).json({
            message: "Product added to cocart successfully",
            cocartProduct: newCocartProduct,
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;