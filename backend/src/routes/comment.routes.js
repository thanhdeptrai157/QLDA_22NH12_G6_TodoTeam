const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// Route to create a new comment
router.post('/', commentController.createComment);

module.exports = router;