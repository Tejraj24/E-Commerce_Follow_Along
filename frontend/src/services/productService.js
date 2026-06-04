import api from './api';

const getProducts = (params = {}) => {
  const queryString = new URLSearchParams();
  if (params.q) queryString.set('q', params.q);
  const qs = queryString.toString();
  return api.get(`/api/v2/product/get-products${qs ? `?${qs}` : ''}`);
};

const getSuggestions = (q) => api.get(`/api/v2/product/suggestions?q=${encodeURIComponent(q)}`);

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
  getSuggestions,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  addToCart,
  getCartProducts,
  updateCartQuantity,
};
