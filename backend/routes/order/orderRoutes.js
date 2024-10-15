const express = require('express');
const orderControllers = require('../../controllers/order/orderControllers');
const router = express.Router();



router.post('/order/place-order', orderControllers.place_order);

module.exports = router;