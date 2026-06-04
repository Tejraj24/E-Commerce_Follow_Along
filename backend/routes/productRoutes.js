const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncError');
const productController = require('../controller/product');
const { pupload } = require('../multer');

router.post('/create-product', pupload.array('images', 10), catchAsyncErrors(productController.createProduct));
router.get('/get-products', catchAsyncErrors(productController.getProducts));
router.get('/my-products', catchAsyncErrors(productController.getMyProducts));
router.get('/product/:id', catchAsyncErrors(productController.getProductById));
router.put('/update-product/:id', pupload.array('images', 10), catchAsyncErrors(productController.updateProduct));
router.delete('/delete-product/:id', catchAsyncErrors(productController.deleteProduct));
router.post('/cart', catchAsyncErrors(productController.addToCart));
router.get('/cartproducts', catchAsyncErrors(productController.getCartProducts));
router.put('/cartproduct/quantity', catchAsyncErrors(productController.updateCartQuantity));

module.exports = router;
