const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to create a new post
router.post('/', postController.createPost);

// Route to get a post by ID
router.get('/:id', postController.getPostById);

router.get('/get_by_place_id/:place_id', postController.getPostByIdPlace);
router.put('/:id', postController.updatePost);
module.exports = router;
