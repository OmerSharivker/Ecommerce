const express = require('express');
const cartControllers = require('../../controllers/home/cartControllers');
const router = express.Router();



router.post('/product/add-to-cart', cartControllers.add_to_cart);



module.exports = router;