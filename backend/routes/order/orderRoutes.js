const express = require('express');
const orderControllers = require('../../controllers/order/orderControllers');
const router = express.Router();



router.post('/order/place-order', orderControllers.place_order);
router.get('/customer/get-dashboard-data/:userId', orderControllers.get_customer_dashboard_data);
router.get('/customer/get-orders/:customerId/:status', orderControllers.get_orders);
router.get('/customer/get-order-details/:orderId', orderControllers.get_order_details);

module.exports = router;