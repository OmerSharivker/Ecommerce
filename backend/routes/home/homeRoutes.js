const express = require('express');
const router = express.Router();
const homeControllers= require('../../controllers/home/homeControllers')


router.get('/get-categories', homeControllers.get_categories);
router.get('/get-products', homeControllers.get_products);
router.get('/price-range-latest-product', homeControllers.price_range_product);
router.get('/query-products', homeControllers.query_products);
router.get('/product-details/:slug',homeControllers.product_details);
router.post('/customer/submit-review',homeControllers.submit_review);
router.get('/customer/get-reviews/:productId',homeControllers.get_reviews);

module.exports = router;