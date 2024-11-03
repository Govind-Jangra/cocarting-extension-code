const express = require('express');
const router = express.Router();
const ProductSelector = require("../models/product_selector");

router.post('/', async (req, res) => {
    try {
        const { website_name } = req.body;
    
        const product = await ProductSelector.findOne({ website_name: website_name });
    
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found for the given website.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;