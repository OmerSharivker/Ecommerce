const express = require('express');
const categoryControllers = require('../../controllers/dashboard/categoryControllers');
const { authMiddleware } = require('../../middlewares/authMiddleware'); ///check if user login
const router = express.Router();



router.post('/category-add',authMiddleware, categoryControllers.add_category);
router.get('/category-get',authMiddleware, categoryControllers.get_category);
router.put('/category-update/:id',authMiddleware, categoryControllers.updateCategory);
router.delete('/category/:id', categoryControllers.deleteCategory) 
module.exports = router;