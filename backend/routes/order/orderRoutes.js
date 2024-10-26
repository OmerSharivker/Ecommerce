const express = require('express');
const orderControllers = require('../../controllers/order/orderControllers');
const router = express.Router();


//customer
router.post('/home/order/place-order', orderControllers.place_order);
router.get('/home/customer/get-dashboard-data/:userId', orderControllers.get_customer_dashboard_data);
router.get('/home/customer/get-orders/:customerId/:status', orderControllers.get_orders);
router.get('/home/customer/get-order-details/:orderId', orderControllers.get_order_details);
//admin
router.get('/admin/orders', orderControllers.get_admin_orders);
router.get('/admin/order/:orderId', orderControllers.get_admin_order);
router.put('/admin/order/update/:orderId', orderControllers.admin_order_status_update);
//seller
router.get('/seller/orders/:sellerId', orderControllers.get_seller_orders);
router.get('/seller/order/:orderId', orderControllers.get_seller_order);
router.put('/seller/order/update/:orderId', orderControllers.seller_order_status_update);
module.exports = router;