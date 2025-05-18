const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// Route to create a new comment
router.post('/', commentController.createComment);      
router.get('/:post_id', commentController.getCommentsByPostId);

module.exports = router;