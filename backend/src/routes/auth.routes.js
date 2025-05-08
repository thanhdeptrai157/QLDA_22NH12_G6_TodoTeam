const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Example route
router.post('/login', async (req, res) => {
  try {
    const result = await authController.login(req.body);
    console.log('Login successful:', result); // Fix log output
    res.status(200).json(result);
  } catch (error) {
    console.error('Error during login:', error); // Fix log output
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;