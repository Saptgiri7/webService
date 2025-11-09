const express = require('express');
const { getCart, addCartItem, removeCartItem } = require('../controllers/cart');
const router = express.Router();


router.route('/').get(getCart).post(addCartItem).delete(removeCartItem);

module.exports = router;