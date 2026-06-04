const Order = require('../model/order');
const User = require('../model/user');
const ErrorHandler = require('../utils/ErrorHandler');

const placeOrder = async ({ email, orderItems, shippingAddress }) => {
  if (!email) throw new ErrorHandler('Email is required.', 400);
  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) throw new ErrorHandler('Order items are required.', 400);
  if (!shippingAddress) throw new ErrorHandler('Shipping address is required.', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found.', 404);
  const orderPromises = orderItems.map(async (item) => {
    const totalAmount = item.price * item.quantity;
    const order = new Order({ user: user._id, orderItems: [item], shippingAddress, totalAmount });
    return order.save();
  });
  const orders = await Promise.all(orderPromises);
  return orders;
};

const getMyOrders = async ({ email }) => {
  if (!email) throw new ErrorHandler('Email is required.', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found.', 404);
  const orders = await Order.find({ user: user._id });
  return orders;
};

module.exports = { placeOrder, getMyOrders };
