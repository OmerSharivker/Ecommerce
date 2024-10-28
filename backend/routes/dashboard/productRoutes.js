const express = require('express');
const productController = require('../../controllers/dashboard/productController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); ///check if user login
const router = express.Router();



router.post('/product-add',authMiddleware, productController.add_product);
router.get('/products-get',authMiddleware, productController.products_get);
router.get('/product-get/:productId',authMiddleware, productController.product_get);
router.post('/product-update',authMiddleware, productController.product_update);
router.post('/product-image-update',authMiddleware, productController.product_image_update);
router.delete('/delete-product/:productId',authMiddleware, productController.delete_product);
router.get('/discount-product',authMiddleware, productController.get_discount_product);
router.put('/zero-discount',authMiddleware, productController.zero_discount);
module.exports = router;