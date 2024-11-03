const axios = require('axios');
const cheerio = require('cheerio');
const { fetchSelectors } = require('../BackgroundMonitoring'); 
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const Product = require('../models/products')(sequelize, Sequelize.DataTypes);
const ProductImage = require('../models/product_images')(sequelize, Sequelize.DataTypes);

// Monitor Product Function
async function monitorProduct() {
    console.log("Scraping data...");
    const products = await Product.findAll();
    for (const product of products) {
        const productUrl = product.product_tracking_url;
        const response = await axios.get(`https://api.scraperapi.com?api_key=${process.env.SCRAPER_API}&url=${productUrl}`);
        const productData = await scrapeProductData(response.data, productUrl);
        if (productData) {
            await updateProduct(product.id, productData);
            console.log(`Product data updated for product_id: ${product.id}`);
        }
    }
}

// Update Product Function
function convertPriceToNumber(priceStr) {
    const match = priceStr.replace(",", "").match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
  }
  function convertToSlug(url) {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/");
    const slug = cleanUrl.filter((part) => part).pop() || "";
    return slug.slice(0, 200);
  }
async function updateProduct(productId, productData) {
    const { name, original_price, price, customer_rating, product_tracking_url,slug, image } = productData;
    try {
        await Product.update({
            name,
            original_price:convertPriceToNumber(original_price),
            price:convertPriceToNumber(price),
            customer_rating,
            product_tracking_url,
            slug:convertToSlug(slug)
        }, { where: { id: productId } });

        if (image) {
            await ProductImage.update({ image }, { where: { product_id: productId } });
        }
        console.log("Product updated successfully");
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

// Scrape Product Data Function
async function scrapeProductData(html, url) {
    const $ = cheerio.load(html);
    const hostname = new URL(url).hostname;

    let productTitle = '';
    let productPrice = '';
    let mrpPrice = '';
    let rating = '';
    let imageUrl = '';

    if (hostname.includes("amazon")) {
        productTitle = $('#productTitle').text().trim() || 'Title not available';
        productPrice = $('.a-price .a-price-whole').text().trim() || 'Price not available';
        mrpPrice = $('.a-text-price .a-offscreen').text().trim() || 'MRP not available';
        rating = $('#acrPopover').attr('title')?.split(' ')[0] || 'Rating not available';
        imageUrl = $('.a-dynamic-image').attr('data-old-hires') || 'Image not available';
    } else if (hostname.includes("flipkart")) {
        productTitle = $('.VU-ZEz').text().trim() || 'Title not available';
        productPrice = $('.Nx9bqj').text().trim() || 'Price not available';
        mrpPrice = $('.yRaY8j').text().trim() || 'MRP not available';
        rating = $('.XQDdHH').text().trim() || 'Rating not available';
        imageUrl = $('.DByuf4').attr('src') || 'Image not available';
    } else {
        const selectors = await fetchSelectors(hostname);
        if (!selectors) {
            console.log('No selectors found for this website');
            return;
        }
        productTitle = $(selectors.title).text().trim() || "Title N/A";
        productPrice = $(selectors.current).text().trim() || "Price N/A";
        mrpPrice = $(selectors.mrp).text().trim() || "MRP N/A";
        rating = $(selectors.rating).text().trim() || "Rating N/A";
        imageUrl = $(selectors.image).attr('src') || "Image N/A";
    }

    return {
        name: productTitle,
        original_price: mrpPrice,
        price: productPrice,
        customer_rating: rating,
        product_tracking_url: url,
        slug: url,
        image: imageUrl
    };
}

module.exports = { monitorProduct, updateProduct, scrapeProductData };
