const express = require('express');
const sellerController = require('../../controllers/dashboard/sellerController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); ///check if user login
const router = express.Router();




router.get('/request-seller-get',authMiddleware,sellerController.get_seller_request);
router.get('/get-seller/:sellerId',authMiddleware,sellerController.get_seller);
router.post('/seller-status-update',authMiddleware,sellerController.seller_status_update);
router.get('/get-sellers',authMiddleware,sellerController.get_active_sellers);
router.get('/get-deactivate',authMiddleware,sellerController.get_deactivate_sellers);
module.exports = router;