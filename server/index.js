const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user'); 
const cocartRoutes = require('./routes/cocart');
const cocartProductRoutes = require('./routes/cocart-product');
const { monitorProduct } = require('./controllers/productController');
const productRoutes = require('./routes/product');
const productSelectorRoutes = require('./routes/productSelectorRoutes');
const productInfoRoutes = require('./routes/productInfoRoutes');
const adminRoutes = require('./routes/admin');
const connectNoSqlDB = require('./config/nosql');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const app = express();
connectNoSqlDB();

app.use(cors("*"));
app.use(bodyParser.json());
app.use(express.json());

// impliment admin authentication layer
async function authLayer(req, res, next) {
    return next();
}



// Monitor Products Endpoint
app.get('/monitor-product', async (req, res) => {
    try {
        await monitorProduct();
        res.json({ message: "Product data updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Schedule Task - Runs every 7 days
cron.schedule('0 0 */7 * *', async () => {
    console.log("Running scheduled task for product monitoring");
    await monitorProduct();
});

// Define routes
app.use('/users', userRoutes);
app.use('/cocarts',cocartRoutes);
app.use('/cocart-products',cocartProductRoutes);
app.use('/products', productRoutes);
app.use('/admin', authLayer,adminRoutes);
app.use('/selector',productSelectorRoutes);
app.use('/product-info',productInfoRoutes);

app.get('/healthcheck', (req, res) => {
    res.json({
        message: "Server is up and running",
        domain: req.hostname
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
