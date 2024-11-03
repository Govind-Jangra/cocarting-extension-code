const express = require('express');
const router = express.Router();
const ProductInfo = require('../utils/product-info');
router.post('/', async (req, res) => {
    const { inputUrl } = req.body;

    if (!inputUrl) {
        return res.status(400).json({ error: "inputUrl is required" });
    }
 
    try {
        const productInfo = await ProductInfo(inputUrl);
        return res.json({ success: true, data: productInfo });
    } catch (error) {
        console.error("Error processing inputUrl:", error);
        return res.status(500).json({ error: "Failed to process the input URL" });
    }
});

module.exports = router;