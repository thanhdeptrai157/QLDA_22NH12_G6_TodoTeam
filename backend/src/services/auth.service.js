const { User } = require('../models');
const bcrypt = require('bcrypt');

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

const changePassword = async (userId, oldPassword, newPassword) => {
  // Tìm user theo ID
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // So sánh mật khẩu cũ
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }

  // Mã hóa mật khẩu mới
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu
  await user.update({ password: hashedPassword });

  return { message: 'Password updated successfully' };
};

const updateProfile = async (userId, updateData) => {
  // Kiểm tra tồn tại người dùng
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Cập nhật thông tin
  await user.update(updateData);
  const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar_path: user.avatar_path,
      cover_path: user.cover_path,
      role: user.role,
      bio: user.bio,
      address: user.address,
    };
  return safeUser;
};

const getInactiveUsers = async () => {
  return await User.findAll({
    where: {
      is_active: false
    }
  });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const toggleUserActiveStatus = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Đảo giá trị is_active
  user.is_active = !user.is_active;
  await user.save();

  return user;
};

const deleteUserById = async (userId) => {
  const deletedCount = await User.destroy({
    where: { id: userId }
  });

  // Trả về true nếu xóa thành công
  return deletedCount > 0;
};

module.exports = {
  getUserByEmail,
  createUser,
  changePassword,
  updateProfile,
  getInactiveUsers,
  getAllUsers,
  toggleUserActiveStatus,
  deleteUserById
};
