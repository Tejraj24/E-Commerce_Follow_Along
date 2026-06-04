const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ordersController = require('../controller/orders');

router.post('/place-order', catchAsyncErrors(ordersController.placeOrder));
router.get('/my-orders', catchAsyncErrors(ordersController.getMyOrders));

module.exports = router;
