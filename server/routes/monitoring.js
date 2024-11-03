const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../config/mysql');
const Sequelize = require('sequelize');
const User = require('../models/users')(sequelize, Sequelize.DataTypes);
const Cocart = require('../models/cocarts')(sequelize, Sequelize.DataTypes);
const CocartProduct = require('../models/cocart_products')(sequelize, Sequelize.DataTypes);
const Product = require('../models/products')(sequelize, Sequelize.DataTypes);


module.exports = router;