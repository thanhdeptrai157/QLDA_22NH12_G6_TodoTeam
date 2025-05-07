const { Post, User, Category, Place } = require('../models');

const getAllPosts = async () => {
    return await Post.findAll({
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] }
        ]
    });
};

const createPost = async (postData) => {
    const { userId, title, content, categoryId, placeId, stars } = postData;

    return await Post.create({
        userId,
        title,
        content,
        category_id: categoryId,
        place_id: placeId,
        stars
    });
};

const getPostById = async (id) => {
    const post = await Post.findOne({
        where: { id },
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] }
        ]
    });

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};

module.exports = { getAllPosts, createPost, getPostById };