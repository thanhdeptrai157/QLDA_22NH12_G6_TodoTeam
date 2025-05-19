const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');

// Route to create a new like
router.post('/', likeController.createLike);
router.delete('/', likeController.deleteLike);
module.exports = router;