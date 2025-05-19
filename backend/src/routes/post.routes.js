const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to create a new post
router.post('/', postController.createPost);
// lấy theo mới nhất
router.get('/top/newest', postController.getNewestPosts);
// Route to get a post by ID
router.get('/:id', postController.getPostById);
router.get('/user/:user_id', postController.getPostByIdUser);
router.get('/get_by_place_id/:place_id', postController.getPostByIdPlace);
router.put('/:id', postController.updatePost);

// Route to get top posts by likes
router.get('/top/likes', postController.getTopPostsByLikes);


router.get('/user/:user_id', postController.getPostByIdUser);


module.exports = router;
