const { Post, User, Category, Place, Like } = require('../models');

const getAllPosts = async () => {
    return await Post.findAll({
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
            { model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ]
    });
};

const createPost = async (postData) => {
    const { user_id, title, content, category_id, place_id, images, place_name , place_address, stars } = postData;
    const place = await Place.findOne({ where: { id: place_id } });
    if (!place) {
        const newPlace = await Place.create({id: place_id, name: place_name, address: place_address, average_stars: stars });
    } else {
        const posts = await Post.findAll({
            attributes: ['stars'],
            where: { place_id: place_id }
        });
        const totalStars = posts.reduce((acc, post) => acc + post.stars, 0);
        const averageStars = (totalStars + stars) / (posts.length + 1);
        console.log(averageStars)
        await Place.update({ average_stars: averageStars }, { where: { id: place_id } });
    }
    console.log(postData)
    return await Post.create({
        user_id,
        title,
        content,
        category_id,
        place_id,
        image: images,
        stars
    });
  }

const getPostById = async (id) => {
    const post = await Post.findOne({
        where: { id },
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
            { model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
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
            { model: Place, attributes: ['id', 'name', 'address'] },
            { model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ]
    });
    

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};
const getPostByIdUser = async (user_id) => {
    const post = await Post.findAll({
        where: { user_id },
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] },
            { model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ]
    });

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
}
const updatePost = async (id, postData) => {
    const post = await Post.findByPk(id);
    if (!post) {
        throw new Error('Post not found');
    }
    const { user_id, title, content, category_id, place_id, name ,image, address, stars } = postData;
    const place = await Place.findOne({ where: { id : place_id} });
    const oldPlaceId = post.place_id;
    post.user_id = user_id;
    post.title = title;
    post.content = content;
    post.category_id = category_id;
    post.place_id = place_id;
    post.image = image;
    post.stars = stars;
    await post.save();
    if (!place) {
        await Place.create({id: place_id, name: name, address: address, average_stars: stars });
        const posts = await Post.findAll({
            attributes: ['stars'],
            where: { place_id: oldPlaceId }
        });
        const totalStars = posts.reduce((acc, post) => acc + post.stars, 0);
        const averageStars = (totalStars) / (posts.length);
        console.log(averageStars)
        await Place.update({ average_stars: averageStars }, { where: { id: oldPlaceId } });
    } else {
        const posts = await Post.findAll({
            attributes: ['stars'],
            where: { place_id: place_id }
        });
        const totalStars = posts.reduce((acc, post) => acc + post.stars, 0);
        const averageStars = (totalStars) / (posts.length);
        console.log(averageStars)
        await Place.update({ average_stars: averageStars }, { where: { id: place_id } });
    }
    return post;
}

const getTopPostsByLikes = async (limit = 5) => {
    const likeCountLiteral = '(SELECT COUNT(*) FROM "like" WHERE "like".target_id = post.id AND "like".is_post = true)';
    const commentCountLiteral = '(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)';
    return await Post.findAll({
        attributes: {
            include: [
                [Post.sequelize.literal(likeCountLiteral), 'likeCount'],
                [Post.sequelize.literal(commentCountLiteral), 'commentCount']
            ]
        },
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] },
            { model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ],
        order: [
            [Post.sequelize.literal(likeCountLiteral), 'DESC'],
            [Post.sequelize.literal(commentCountLiteral), 'DESC']
        ],
        limit
    });
};

const getNewestPosts = async (limit = 5) =>{
    return await Post.findAll({
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] },
            { model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }

        ],
        order: [['created_at', 'DESC']],
        limit
    });
}
module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  getPostByIdPlace,
  getPostByIdUser,
  updatePost,
  getTopPostsByLikes,
  getNewestPosts
};


