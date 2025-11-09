const express = require('express');
const { getAllProducts, getSingleProduct } = require('../controllers/products');
const router = express.Router();


router.route('/').get(getAllProducts);
router.route('/:id').get(getSingleProduct);


module.exports = router;