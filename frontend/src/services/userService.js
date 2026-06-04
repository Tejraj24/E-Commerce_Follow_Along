import api from './api';

const signup = (formData) => api.post('/api/v2/user/create-user', formData);

const login = async ({ email, password }) => {
  const res = await api.post('/api/v2/user/login', { email, password });
  // save token for subsequent requests
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

const getProfile = (email) => api.get(`/api/v2/user/profile?email=${encodeURIComponent(email)}`);

const addAddress = (payload) => api.post('/api/v2/user/add-address', payload);

const getAddresses = (email) => api.get(`/api/v2/user/addresses?email=${encodeURIComponent(email)}`);

export default { signup, login, getProfile, addAddress, getAddresses };
