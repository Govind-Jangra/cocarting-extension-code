const mongoose = require('mongoose');

const ProductSelectorSchema = new mongoose.Schema({
    website_name: { type: String, required: true },
    title: { type: [String] },  // Array of strings
    mrp: { type: [String] },    // Array of strings
    current: { type: [String] },// Array of strings
    rating: { type: [String] }, // Array of strings
    image: { type: [String] },  // Array of strings
}, { timestamps: true });

const ProductSelector = mongoose.model('product-selector', ProductSelectorSchema);

module.exports = ProductSelector;
