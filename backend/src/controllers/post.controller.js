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

const getPostByIdUser = async (req, res) => {
    try {
        const post = await postService.getPostByIdUser(req.params.user_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getTopPostsByLikes = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const posts = await postService.getTopPostsByLikes(limit);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const posts = await postService.getPostsByCategory(categoryId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNewestPosts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const posts = await postService.getNewestPosts(limit);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const togglePostActive = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await postService.togglePostActiveStatus(postId);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getInactivePosts = async (req, res) => {
  try {
    const posts = await postService.getInactivePosts();
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching inactive posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deleted = await postService.deletePostById(postId);

    if (!deleted) {
      return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }

    res.status(200).json({ message: 'Xóa bài viết thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getByCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const posts = await postService.getPostByCategory(categoryId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const getAllPostsWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const filters = {
      category_id: req.query.category_id,
      search: req.query.search,
      sort_by: req.query.sort_by || 'created_at',
      sort_order: req.query.sort_order || 'DESC'
    };

    const result = await postService.getAllPostsWithPagination(page, limit, filters);
    
    res.status(200).json({
      success: true,
      data: result.posts,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error fetching posts with pagination:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    getPostByIdPlace,
    getPostsByCategory,
    updatePost,
    getPostByIdUser,
    getTopPostsByLikes,
    getNewestPosts,
    togglePostActive,
    getInactivePosts,
    deletePost,
    getByCategory,
    getAllPostsWithPagination
};
