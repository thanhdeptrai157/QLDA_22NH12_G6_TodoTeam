const commentService = require('../services/comment.service');
const createComment = async (req, res) => {
    try {
        const newComment = await commentService.createComment(req.body);
        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    createComment,
};