const express = require('express');
const customerAuthControllers = require('../../controllers/home/customerAuthControllers');
const router = express.Router();



router.post('/customer/customer-register', customerAuthControllers.customer_register);
router.post('/customer/customer-login', customerAuthControllers.customer_login);
router.get('/customer/logout', customerAuthControllers.customer_logout);

module.exports = router;