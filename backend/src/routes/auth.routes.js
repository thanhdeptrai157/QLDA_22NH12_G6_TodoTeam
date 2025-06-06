const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middlewares/upload');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorize');
// const { authorize } = require('../middlewares/authorize');

// Route đăng nhập
router.post('/login', authController.login);

// Route đăng ký
router.post('/register', authController.register);

router.put('/:id/change-password', authController.changePassword);

router.put(
  '/:id/change-profile',
  authController.updateProfile
);

// lấy ra tất cả tài khoản bị khóa
router.get('/inactive', authenticateToken, authorizeRole.authorizeRole('admin'), authController.getInactiveUsers);
// lấy thông tin của tất cả người dùng
router.get('/users', authenticateToken, authorizeRole.authorizeRole('admin'), authController.getAllUsers);
// chặn hoặc bỏ chặn một user
router.put('/:id/toggle-active', authenticateToken, authorizeRole.authorizeRole('admin'), authController.toggleUserActive);
// Xóa một tài khoản user
router.delete('/:id', authenticateToken, authorizeRole.authorizeRole('admin'), authController.deleteUser);

module.exports = router;
