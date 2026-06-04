import api from './api';

const placeOrder = (payload) => api.post('/api/v2/orders/place-order', payload);
const getMyOrders = (email) => api.get(`/api/v2/orders/my-orders?email=${encodeURIComponent(email)}`);

export default { placeOrder, getMyOrders };
