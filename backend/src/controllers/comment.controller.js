const commentService = require('../services/comment.service');
const createComment = async (req, res) => {
    try {
        const newComment = await commentService.createComment(req.body);
        res.status(201).json({comment: newComment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getCommentsByPostId = async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const comments = await commentService.getCommentsByPostId(post_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    createComment,
    getCommentsByPostId
}