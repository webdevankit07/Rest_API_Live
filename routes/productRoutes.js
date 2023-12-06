const express = require('express');
const router = express.Router();
const { getALLProducts } = require('../controllers/productControllers');

//! ............ Routers .......... //
router.get('/', getALLProducts);

exports.productRouters = router;
