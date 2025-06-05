const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/auth.service');
const supabase = require('../config/supabase');
const upload = require('../middlewares/upload');
require('dotenv').config();
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

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarPath: user.avatarPath,
      role: user.role,
    };
    res.send({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: safeUser,
    });
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
      return res.status(409).send({ message: 'Email already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Tạo token JWT
    const accessToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    const refreshToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );

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
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,);

    // Tạo Access Token mới
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
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
    return res
      .status(400)
      .json({ message: 'Both old and new passwords are required' });
  }

  try {
    const result = await userService.changePassword(
      userId,
      oldPassword,
      newPassword,
    );
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

    const files = req.files;
    const errors = [];
    let avatar_path;
    let cover_path;

    // Hàm phụ để upload 1 ảnh và trả về public URL
    const uploadToSupabase = async (file) => {
      const fileName = `${Date.now()}_${file.originalname}`;
      const { data, error } = await supabase.storage
        .from('image-travel-app')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        return { error: error.message };
      }

      const publicUrl = `${process.env.SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/image-travel-app/${fileName}`;
      return { url: publicUrl };
    };

    // Xử lý ảnh avata
    if (files.avatar_path && files.avatar_path.length > 0) {
      const { url, error } = await uploadToSupabase(files.avatar_path[0]);
      if (error) {
        res.json({error: errors.push({ field: 'avatar', message: error })});
      } else {
        avatar_path = url;
      }
    }

    // Xử lý ảnh background
    if (files.cover_path && files.cover_path.length > 0) {
      const { url, error } = await uploadToSupabase(files.cover_path[0]);
      if (error) {
        res.json({error: errors.push({ field: 'cover', message: error })});
      } else {
        cover_path = url;
      }
    }

    const updateData = {
      address,
      bio,
      phone,
    };

    if (avatar_path) {
      updateData.avatar_path = avatar_path;
    }

    if (cover_path) {
      updateData.cover_path = cover_path;
    }

    const updatedUser = await userService.updateProfile(userId, updateData);

    res.json({ message: 'Update thành công', user: updatedUser });
  } catch (err) {
    console.error(err);
    const statusCode = err.message === 'User not found' ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
};

const getInactiveUsers = async (req, res) => {
  try {
    const users = await userService.getInactiveUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching inactive users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const toggleUserActive = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.toggleUserActiveStatus(userId);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await userService.deleteUserById(userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.status(200).json({ message: 'Xóa người dùng thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  register,
  changePassword,
  updateProfile,
  refreshAccessToken,
  getInactiveUsers,
  getAllUsers,
  toggleUserActive,
  deleteUser
};
