const express = require('express');
const router = express.Router();
const { getALLProducts, getProduct } = require('../controllers/productControllers');

//! ............ Routers .......... //
router.get('/', getALLProducts).get('/:id', getProduct);

exports.productRouters = router;
