const ProductSelector = require("../models/product_selector");

async function storeInMongoDB(productData) {
    try {

        productData.title = Array.isArray(productData.title) ? productData.title : [productData.title];
        productData.mrp = Array.isArray(productData.mrp) ? productData.mrp : [productData.mrp];
        productData.current = Array.isArray(productData.current) ? productData.current : [productData.current];
        productData.rating = Array.isArray(productData.rating) ? productData.rating : [productData.rating];
        productData.image = Array.isArray(productData.image) ? productData.image : [productData.image];

        // Updating or inserting the product data
        const updatedProduct = await ProductSelector.findOneAndUpdate(
            { website_name: productData.website_name },  // Query by website name
            {
                title: productData.title,
                mrp: productData.mrp,
                current: productData.current,
                rating: productData.rating,
                image:productData.image
            },
            { 
                new: true,        // Return the updated document
                upsert: true,     // Insert if the document doesn't exist
            }
        );

        console.log('Data processed:', updatedProduct._id);

    } catch (error) {
        // Log detailed error information
        if (error.cause) {
            console.error('MongoDB connection error cause:', error.cause);
        }
        console.error('Error storing data in MongoDB:', error);
    } finally {
        // Ensure the MongoDB connection is closed
    }
}

module.exports = storeInMongoDB;
