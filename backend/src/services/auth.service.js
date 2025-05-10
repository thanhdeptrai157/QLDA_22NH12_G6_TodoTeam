const { User } = require('../models');
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user by email');
  }
};
// Tạo người dùng mới
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
};

module.exports = {
  getUserByEmail,
  createUser,
};