const express = require('express');
const cartControllers = require('../../controllers/home/cartControllers');
const router = express.Router();



router.post('/product/add-to-cart', cartControllers.add_to_cart);
router.get('/product/get-cart-product/:userId', cartControllers.get_cart_product);
router.delete('/product/delete-cart-product/:cart_id', cartControllers.delete_cart_product);
router.put('/product/quantity-inc/:cart_id', cartControllers.quantity_inc);
router.put('/product/quantity-dec/:cart_id', cartControllers.quantity_dec);
router.post('/product/add-to-wishlist', cartControllers.add_to_wishlist);
router.get('/product/get-wishlist-products/:userId', cartControllers.get_wishlist);
router.delete('/product/remove-wishlist-product/:wishlistId',cartControllers.remove_wishlist)

module.exports = router;