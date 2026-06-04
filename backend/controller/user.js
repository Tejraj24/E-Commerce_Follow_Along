const path = require('path');
const ErrorHandler = require('../utils/ErrorHandler');
const userService = require('../services/userService');

// Thin controller functions that delegate to service layer and keep response shapes
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;
  const user = await userService.createUser({ name, email, password, file });
  res.status(201).json({ success: true, user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token } = await userService.loginUser({ email, password });
  res.status(200).json({ success: true, user, token });
};

const profile = async (req, res, next) => {
  const { email } = req.query;
  const data = await userService.getProfile({ email });
  res.status(200).json({ success: true, ...data });
};

const addAddress = async (req, res, next) => {
  const { country, city, address1, address2, zipCode, addressType, email } = req.body;
  const addresses = await userService.addAddress({ email, address: { country, city, address1, address2, zipCode, addressType } });
  res.status(201).json({ success: true, addresses });
};

const getAddresses = async (req, res, next) => {
  const { email } = req.query;
  const addresses = await userService.getAddresses({ email });
  res.status(200).json({ success: true, addresses });
};

module.exports = {
  createUser,
  login,
  profile,
  addAddress,
  getAddresses,
};
