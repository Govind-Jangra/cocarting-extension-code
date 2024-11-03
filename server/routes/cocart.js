const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const User = require('../models/users')(sequelize, Sequelize.DataTypes);
const Cocart = require('../models/cocarts')(sequelize, Sequelize.DataTypes);
const CocartProduct = require('../models/cocart_products')(sequelize, Sequelize.DataTypes);
const Product = require('../models/products')(sequelize, Sequelize.DataTypes);
const ProductImage = require('../models/product_images')(sequelize, Sequelize.DataTypes);

Product.hasMany(ProductImage, { foreignKey: 'product_id', sourceKey: 'id' });
Product.hasMany(CocartProduct, { foreignKey: 'product_id', sourceKey: 'id' });

// Create a new cocart
router.post('/', async (req, res) => {
    const { user_id, name, slug } = req.body;
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const newCocart = await Cocart.create({
            name,
            user_id,
            slug,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(201).json(newCocart);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Get all cocarts for a specific user
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const cocarts = await Cocart.findAll({
            where: { user_id }
        });
        res.json(cocarts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a cocart by ID
router.delete('/:cocart_id', async (req, res) => {
    const { cocart_id } = req.params;
    try {
        // Delete related products in cocart
        await CocartProduct.destroy({
            where: { cocart_id }
        });
        
        const cocart = await Cocart.findByPk(cocart_id);
        if (!cocart) {
            return res.status(404).json({ error: "Cocart not found" });
        }

        await cocart.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all products in a specific cocart
router.get('/:cocart_id/products', async (req, res) => {
    const cocartId = req.params.cocart_id;

    try {
        // Find the cocart
        const cocart = await Cocart.findOne({ where: { id: cocartId } });
        if (!cocart) {
            return res.status(404).json({ detail: 'Cocart not found' });
        }

        // Get the products associated with the cocart
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    attributes: ['image', 'thumbnail', 'medium_image', 'large_image']
                },
                {
                    model: CocartProduct,
                    where: { cocart_id: cocartId },
                    attributes: [],
                    required: true
                }
            ]
        });

        const response = products.map(product => {
            const { 
                id, 
                name, 
                original_price, 
                customer_rating, 
                price, 
                product_tracking_url, 
                slug, 
                added_by, 
                product_images 
            } = product.dataValues;
        
            return {
                id,
                name,
                original_price,
                customer_rating,
                price,
                product_tracking_url,
                slug,
                added_by,
                images: product_images.map(image => ({
                    image: image.dataValues.image,
                    thumbnail: image.dataValues.thumbnail,
                    medium_image: image.dataValues.medium_image,
                    large_image: image.dataValues.large_image
                }))
            };
        });
        

        // Send the response
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ detail: 'Internal Server Error' });
    }
});


module.exports = router;
