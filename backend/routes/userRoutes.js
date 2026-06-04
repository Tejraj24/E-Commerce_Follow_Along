const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncError');
const userController = require('../controller/user');
const { upload } = require('../multer');

router.post('/create-user', upload.single('file'), catchAsyncErrors(userController.createUser));
router.post('/login', catchAsyncErrors(userController.login));
router.get('/profile', catchAsyncErrors(userController.profile));
router.post('/add-address', catchAsyncErrors(userController.addAddress));
router.get('/addresses', catchAsyncErrors(userController.getAddresses));

module.exports = router;
