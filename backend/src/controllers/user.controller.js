const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
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

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.send({ message: 'Login successful', token });
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
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });

    res.status(201).send({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
  register,
};