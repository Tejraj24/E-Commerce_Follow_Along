import api from './api';

const getProducts = () => api.get('/api/v2/product/get-products');
const getProduct = (id) => api.get(`/api/v2/product/product/${id}`);
const createProduct = (formData) => api.post('/api/v2/product/create-product', formData);
const updateProduct = (id, formData) => api.put(`/api/v2/product/update-product/${id}`, formData);
const deleteProduct = (id) => api.delete(`/api/v2/product/delete-product/${id}`);
const getMyProducts = (email) => api.get(`/api/v2/product/my-products?email=${encodeURIComponent(email)}`);

const addToCart = (payload) => api.post('/api/v2/product/cart', payload);
const getCartProducts = (email) => api.get(`/api/v2/product/cartproducts?email=${encodeURIComponent(email)}`);
const updateCartQuantity = (payload) => api.put('/api/v2/product/cartproduct/quantity', payload);

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  addToCart,
  getCartProducts,
  updateCartQuantity,
};
