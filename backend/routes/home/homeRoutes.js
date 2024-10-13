const express = require('express');
const router = express.Router();
const homeControllers= require('../../controllers/home/homeControllers')


router.get('/get-categories', homeControllers.get_categories);
router.get('/get-products', homeControllers.get_products);
router.get('/price-range-latest-product', homeControllers.price_range_product);
router.get('/query-products', homeControllers.query_products);


module.exports = router;