const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// Route đăng nhập
router.post('/login', userController.login);

// Route đăng ký
router.post('/register', userController.register);


module.exports = router;