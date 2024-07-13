const express = require('express');
const sellerController = require('../../controllers/dashboard/sellerController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); ///check if user login
const router = express.Router();




router.get('/request-seller-get',authMiddleware,sellerController.get_seller_request);


module.exports = router;