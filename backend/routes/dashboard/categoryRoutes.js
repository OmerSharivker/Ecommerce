const express = require('express');
const categoryControllers = require('../../controllers/dashboard/categoryControllers');
const { authMiddleware } = require('../../middlewares/authMiddleware'); ///check if user login
const router = express.Router();



router.post('/category-add',authMiddleware, categoryControllers.add_category);
router.get('/category-get',authMiddleware, categoryControllers.get_category);

module.exports = router;