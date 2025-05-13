const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const userService = require('../services/auth.service');
// Đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, 'your_refresh_secret_key', { expiresIn: '7d' });
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarPath: user.avatarPath,
      role: user.role,
    };
    res.send({ message: 'Login successful', accessToken, refreshToken, user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Đăng ký
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      phone
    });

    // Tạo token JWT
    const accessToken = jwt.sign({ id: newUser.id, email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: newUser.id, email: newUser.email }, 'your_refresh_secret_key', { expiresIn: '7d' });

    res.status(201).send({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
// API Refresh Token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send({ message: 'Refresh token is required' });
  }

  try {
    // Xác minh Refresh Token
    const decoded = jwt.verify(refreshToken, 'your_refresh_secret_key');

    // Tạo Access Token mới
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    res.send({
      message: 'Access token refreshed successfully',
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(403).send({ message: 'Invalid or expired refresh token' });
  }
};

const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Both old and new passwords are required' });
  }

  try {
    const result = await userService.changePassword(userId, oldPassword, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { address, bio, phone } = req.body;

    if (!req.body) {
      return res.status(400).json({ message: 'Missing request body' });
    }

    const updatedUser = await userService.updateProfile(userId, { address, bio, phone });

    res.json({ message: 'Update thành công', user: updatedUser });
  } catch (err) {
    console.error(err);
    const statusCode = err.message === 'User not found' ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
  changePassword,
  updateProfile
  refreshAccessToken,
};
