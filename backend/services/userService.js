const User = require('../model/user');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');

const createUser = async ({ name, email, password, file }) => {
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    if (file) {
      const filepath = path.join(__dirname, '..', 'uploads', file.filename);
      try {
        fs.unlinkSync(filepath);
      } catch (err) {
        // ignore remove errors
      }
    }
    throw new ErrorHandler('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const fileUrl = file ? path.join('uploads', file.filename) : '';

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: file?.filename || '',
      url: fileUrl,
    },
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new ErrorHandler('Please provide email and password', 400);
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ErrorHandler('Invalid Email or Password', 401);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ErrorHandler('Invalid Email or Password', 401);
  user.password = undefined;
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
  return { user, token };
};

const getProfile = async ({ email }) => {
  if (!email) throw new ErrorHandler('Please provide an email', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found', 404);
  return {
    user: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatar?.url,
    },
    addresses: user.addresses,
  };
};

const addAddress = async ({ email, address }) => {
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found', 404);
  user.addresses.push(address);
  await user.save();
  return user.addresses;
};

const getAddresses = async ({ email }) => {
  if (!email) throw new ErrorHandler('Please provide an email', 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler('User not found', 404);
  return user.addresses;
};

module.exports = {
  createUser,
  loginUser,
  getProfile,
  addAddress,
  getAddresses,
};
