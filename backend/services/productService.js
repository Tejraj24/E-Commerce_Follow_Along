const Product = require('../model/product');
const User = require('../model/user');
const mongoose = require('mongoose');
const path = require('path');
const ErrorHandler = require('../utils/ErrorHandler');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateProductData = (data) => {
  const errors = [];
  if (!data.name) errors.push('Product name is required');
  if (!data.description) errors.push('Product description is required');
  if (!data.category) errors.push('Product category is required');
  if (!data.price || isNaN(data.price) || data.price <= 0) errors.push('Valid product price is required');
  if (!data.stock || isNaN(data.stock) || data.stock < 0) errors.push('Valid product stock is required');
  if (!data.email) errors.push('Email is required');
  return errors;
};

const createProduct = async ({ body, files }) => {
  const { name, description, category, tags, price, stock, email } = body;
  const images = (files || []).map((file) => `/products/${path.basename(file.path)}`);
  const validationErrors = validateProductData({ name, description, category, price, stock, email });
  if (validationErrors.length) throw new ErrorHandler(validationErrors.join('; '), 400);
  if (images.length === 0) throw new ErrorHandler('At least one image is required', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('Email does not exist in the users database', 400);
  const newProduct = new Product({ name, description, category, tags, price, stock, email, images });
  await newProduct.save();
  return newProduct;
};

const getProducts = async () => {
  const products = await Product.find();
  return products.map((product) => product);
};

const getMyProducts = async ({ email }) => {
  const products = await Product.find({ email });
  return products;
};

const getProductById = async ({ id }) => {
  if (!isValidObjectId(id)) throw new ErrorHandler('Invalid product ID format.', 400);
  const product = await Product.findById(id);
  if (!product) throw new ErrorHandler('Product not found.', 404);
  return product;
};

const updateProduct = async ({ id, body, files }) => {
  if (!isValidObjectId(id)) throw new ErrorHandler('Invalid product ID format.', 400);
  const existingProduct = await Product.findById(id);
  if (!existingProduct) throw new ErrorHandler('Product not found.', 404);
  let updatedImages = existingProduct.images;
  if (files && files.length > 0) updatedImages = files.map((file) => `/products/${path.basename(file.path)}`);
  const { name, description, category, tags, price, stock, email } = body;
  const validationErrors = validateProductData({ name, description, category, price, stock, email });
  if (validationErrors.length) throw new ErrorHandler(validationErrors.join('; '), 400);
  existingProduct.name = name;
  existingProduct.description = description;
  existingProduct.category = category;
  existingProduct.tags = tags;
  existingProduct.price = price;
  existingProduct.stock = stock;
  existingProduct.email = email;
  existingProduct.images = updatedImages;
  await existingProduct.save();
  return existingProduct;
};

const deleteProduct = async ({ id }) => {
  if (!isValidObjectId(id)) throw new ErrorHandler('Invalid product ID format.', 400);
  const existingProduct = await Product.findById(id);
  if (!existingProduct) throw new ErrorHandler('Product not found.', 404);
  await existingProduct.deleteOne();
  return true;
};

const addToCart = async ({ userEmail, productId, quantity }) => {
  const email = userEmail;
  if (!email) throw new ErrorHandler('Email is required', 400);
  if (!mongoose.Types.ObjectId.isValid(productId)) throw new ErrorHandler('Invalid productId', 400);
  if (!quantity || quantity < 1) throw new ErrorHandler('Quantity must be at least 1', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found', 404);
  const product = await Product.findById(productId);
  if (!product) throw new ErrorHandler('Product not found', 404);
  const cartItemIndex = user.cart.findIndex((item) => item.productId.toString() === productId);
  if (cartItemIndex > -1) user.cart[cartItemIndex].quantity += quantity;
  else user.cart.push({ productId, quantity });
  await user.save();
  return user.cart;
};

const getCartProducts = async ({ email }) => {
  if (!email) throw new ErrorHandler('Email query parameter is required', 400);
  const user = await User.findOne({ email }).populate({ path: 'cart.productId', model: 'Product' });
  if (!user) throw new ErrorHandler('User not found', 404);
  return user.cart;
};

const updateCartQuantity = async ({ email, productId, quantity }) => {
  if (!email || !productId || quantity === undefined) throw new ErrorHandler('Email, productId, and quantity are required', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found', 404);
  const cartProduct = user.cart.find((item) => item.productId.toString() === productId);
  if (!cartProduct) throw new ErrorHandler('Product not found in cart', 404);
  cartProduct.quantity = quantity;
  await user.save();
  return user.cart;
};

module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToCart,
  getCartProducts,
  updateCartQuantity,
};
