const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authorizeRole = require('../middlewares/authorize');
const authenticateToken = require('../middlewares/authMiddleware');

// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to create a new post
router.post('/', postController.createPost);
// lấy theo mới nhất
router.get('/top/newest', postController.getNewestPosts);
router.get('/paginated', postController.getAllPostsWithPagination);
// Xem những bài viết bị bài viết bị báo cáo chỉ có admin có quyền
router.get('/inactive_post', authenticateToken, authorizeRole.authorizeRole('admin'), postController.getInactivePosts);
// Báo cáo hoặc bỏ báo cáo một bài viết người dùng và admin có thể báo cáo
router.put('/:id/toggle-active', authenticateToken, postController.togglePostActive);
// Xóa bài viết chỉ có admin có quyền
router.delete('/:id', authenticateToken, authorizeRole.authorizeRole('admin'), postController.deletePost);

// Route to get a post by ID
router.get('/:id', postController.getPostById);
router.get('/user/:user_id', postController.getPostByIdUser);
router.get('/get_by_place_id/:place_id', postController.getPostByIdPlace);
router.put('/:id', postController.updatePost);

// Route to get top posts by likes
router.get('/top/likes', postController.getTopPostsByLikes);
router.get('/category/:category_id', postController.getByCategory);

module.exports = router;
