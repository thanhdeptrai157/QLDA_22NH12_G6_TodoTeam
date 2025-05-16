const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middlewares/upload');
const authenticateToken = require('../middlewares/authMiddleware');
// const { authorize } = require('../middlewares/authorize');

// Route đăng nhập
router.post('/login', authController.login);

// Route đăng ký
router.post('/register', authController.register);

router.put('/:id/change-password', authenticateToken, authController.changePassword);

router.put(
  '/:id/profile',
  authenticateToken,
  upload.fields([
    { name: 'avatar_path', maxCount: 1 },
    { name: 'cover_path', maxCount: 1 },
  ]),
  authController.updateProfile
);

module.exports = router;
