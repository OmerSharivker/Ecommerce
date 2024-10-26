const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const paymentController = require('../controllers/payment/paymentController');
const router = express.Router();



router.get('/payment/create-stripe-connect-account',authMiddleware, paymentController.create_stripe_connect_account);
router.put('/payment/active-stripe-connect-account/:activeCode',authMiddleware,paymentController.active_stripe_connect_account);
router.get('/payment/get-seller-payment-details/:sellerId',authMiddleware, paymentController.get_seller_payment_details);
router.post('/payment/withdrawal-request',authMiddleware,paymentController.withdrawal_request)
module.exports = router;