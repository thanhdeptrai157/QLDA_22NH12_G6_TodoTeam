const likeService = require('../services/like.service');

const createLike = async (req, res) => {
    try {
        console.log(req.body)
        const newLike = await likeService.createLike(req.body);
        res.status(201).json({like: newLike });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const deleteLike = async (req, res) => {
    try {
        const deletedLike = await likeService.deleteLike(req.query);
        res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = {
    createLike,
    deleteLike
}