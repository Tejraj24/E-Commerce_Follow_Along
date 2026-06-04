const productService = require('../services/productService');

const createProduct = async (req, res, next) => {
  const product = await productService.createProduct({ body: req.body, files: req.files });
  res.status(201).json({ message: 'Product created successfully', product });
};

const getProducts = async (req, res, next) => {
  const products = await productService.getProducts();
  res.status(200).json({ products });
};

const getMyProducts = async (req, res, next) => {
  const { email } = req.query;
  const products = await productService.getMyProducts({ email });
  res.status(200).json({ products });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getProductById({ id });
  res.status(200).json({ product });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updated = await productService.updateProduct({ id, body: req.body, files: req.files });
  res.status(200).json({ message: '✅ Product updated successfully', product: updated });
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  await productService.deleteProduct({ id });
  res.status(200).json({ message: '✅ Product deleted successfully' });
};

const addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  const cart = await productService.addToCart({ userEmail: userId, productId, quantity });
  res.status(200).json({ message: 'Cart updated successfully', cart });
};

const getCartProducts = async (req, res, next) => {
  const { email } = req.query;
  const cart = await productService.getCartProducts({ email });
  res.status(200).json({ message: 'Cart retrieved successfully', cart });
};

const updateCartQuantity = async (req, res, next) => {
  const { email, productId, quantity } = req.body;
  const cart = await productService.updateCartQuantity({ email, productId, quantity });
  res.status(200).json({ message: 'Cart product quantity updated successfully', cart });
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