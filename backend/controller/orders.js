const ordersService = require('../services/ordersService');

const placeOrder = async (req, res, next) => {
  const { email, orderItems, shippingAddress } = req.body;
  const orders = await ordersService.placeOrder({ email, orderItems, shippingAddress });
  res.status(201).json({ message: 'Orders placed and cart cleared successfully.', orders });
};

const getMyOrders = async (req, res, next) => {
  const { email } = req.query;
  const orders = await ordersService.getMyOrders({ email });
  res.status(200).json({ orders });
};

module.exports = { placeOrder, getMyOrders };