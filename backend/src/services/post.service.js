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
    const { user_id, title, content, category_id, place_id, image, name , address, stars } = postData;
    const place = await Place.findOne({ where: { id: place_id } });
    if (!place) {
        const newPlace = await Place.create({id: place_id, name, address });
    }
    console.log(postData)
    return await Post.create({
        user_id,
        title,
        content,
        category_id,
        place_id,
        image,
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

const getPostByIdPlace = async (place_id) => {
    const post = await Post.findOne({
        where: { place_id },
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


const updatePost = async (id, postData) => {
    const post = await Post.findByPk(id);
    if (!post) {
        throw new Error('Post not found');
    }
    const { user_id, title, content, category_id, place_id, name ,image, address, stars } = postData;
    const place = await Place.findOne({ where: { id : place_id} });
    if (!place) {
        const newPlace = await Place.create({id: place_id, name, address });
    }
    post.user_id = user_id;
    post.title = title;
    post.content = content;
    post.category_id = category_id;
    post.place_id = place_id;
    post.image = image;
    post.stars = stars;
    await post.save();
    return post;
}
const getPostByIdUser = async (user_id) => {
    const post = await Post.findAll({
        where: { user_id },
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
}
module.exports = {
  getAllPosts,
  createPost,
  getPostById,
    getPostByIdPlace,
    updatePost,
    getPostByIdUser
};
