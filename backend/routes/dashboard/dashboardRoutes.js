const express = require('express');
const { authMiddleware } = require('../../middlewares/authMiddleware'); ///check if user login
const dashboardController = require('../../controllers/dashboard/dashboardController');
const router = express.Router();




router.get('/dashboard/get-admin-dashboard-data',authMiddleware,dashboardController.get_admin_dashboard_data);
router.get('/dashboard/get-seller-dashboard-data',authMiddleware,dashboardController.get_seller_dashboard_data);
router.post('/banner/add',authMiddleware, dashboardController.add_banner)  
router.get('/banner/get/:productId',authMiddleware, dashboardController.get_banner)  
router.put('/banner/update/:bannerId',authMiddleware, dashboardController.update_banner)  

router.get('/banners', dashboardController.get_banners)
       
module.exports = router;