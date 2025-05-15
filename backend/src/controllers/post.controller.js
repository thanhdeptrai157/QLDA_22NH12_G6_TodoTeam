const postService = require('../services/post.service');

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        console.log(req.body)
        const newPost = await postService.createPost(req.body);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getPostByIdPlace = async (req, res) => {
    try {
        const post = await postService.getPostByIdPlace(req.params.place_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const updatePost = async (req, res) => {
    try {
        const updatedPost = await postService.updatePost(req.params.id, req.body);
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
getPostByIdPlace,
updatePost
};
