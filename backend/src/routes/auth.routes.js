const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middlewares/upload');

// Route đăng nhập
router.post('/login', authController.login);

// Route đăng ký
router.post('/register', authController.register);

router.put('/:id/change-password', authController.changePassword);

router.put(
  '/:id/profile',
  upload.fields([
    { name: 'avatar_path', maxCount: 1 },
    { name: 'cover_path', maxCount: 1 },
  ]),
  authController.updateProfile
);

module.exports = router;
