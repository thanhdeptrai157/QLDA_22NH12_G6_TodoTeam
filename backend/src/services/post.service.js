const { Post, User, Category, Place, Like } = require('../models');
const { Op, literal } = require('sequelize');

const getAllPosts = async () => {
    return await Post.findAll({
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
            {
                model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ]
    });
};

const createPost = async (postData) => {
    const { user_id, title, content, category_id, images, place_name, place_address, lat, lng, stars } = postData;
    const place = await Place.findOne({ where: { name: place_name, address: place_address } });
    let place_id = null;
    if (!place) {
        const newPlace = await Place.create({ name: place_name, address: place_address, average_stars: stars, longitude: lng, latitude: lat });
        place_id = newPlace.id;
    } else {
        place_id = place.id;
        const posts = await Post.findAll({
            attributes: ['stars'],
            where: { place_id: place.id }
        });
        const totalStars = posts.reduce((acc, post) => acc + post.stars, 0);
        const averageStars = (totalStars + stars) / (posts.length + 1);
        await Place.update({ average_stars: averageStars }, { where: { id: place.id } });
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

const getPostsByCategory = async (category_id) => {
    const posts = await Post.findAll({
        where: { category_id },
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] },
            {
                model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ]
    });
    if (posts.length === 0) {
        throw new Error('No posts found for this category');
    }
    return posts;
};

const getPostById = async (id) => {
    const post = await Post.findOne({
        where: { id },
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
            {
                model: Like, as: 'like', attributes: ['user_id'],
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
            {
                model: Like, as: 'like', attributes: ['user_id'],
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
            {
                model: Like, as: 'like', attributes: ['user_id'],
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
    const { user_id, title, content, category_id, place_id, name, image, address, stars } = postData;
    const place = await Place.findOne({ where: { id: place_id } });
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
        await Place.create({ id: place_id, name: name, address: address, average_stars: stars });
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
            {
                model: Like, as: 'like', attributes: ['user_id'],
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

const getNewestPosts = async (limit = 5) => {
    return await Post.findAll({
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address'] },
            {
                model: Like, as: 'like', attributes: ['user_id'],
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

const getInactivePosts = async () => {
    return await Post.findAll({
        where: {
            is_active: false
        }
    });
};

const togglePostActiveStatus = async (id) => {
    const post = await Post.findByPk(id);
    if (!post) {
        throw new Error('Post not found');
    }

    // Đảo giá trị is_active
    post.is_active = !post.is_active;
    await post.save();

    return post;
};

const deletePostById = async (id) => {
    const deletedCount = await Post.destroy({
        where: { id: id }
    });

    // Trả về true nếu xóa thành công
    return deletedCount > 0;
};

const getPostByCategory = async (category_id) => {
    const posts = await Post.findAll({
        where: { category_id },
        include: [
            { model: User, attributes: ['id', 'name', 'avatar_path'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
            {
                model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ],
        order: [['created_at', 'DESC']]
    });

    if (!posts) {
        throw new Error('No posts found for this category');
    }

    return posts;
};
const getAllPostsWithPagination = async (page = 1, limit = 9, filters = {}) => {
    const offset = (page - 1) * limit;
    const { category_id, search, sort_by = 'created_at', sort_order = 'DESC' } = filters;

    const whereClause = {
        is_active: true
    };

    // Filter by category
    if (category_id && category_id !== 'all') {
        whereClause.category_id = parseInt(category_id);
    }

    // Search filter
    if (search && search.trim()) {
        whereClause[Op.or] = [
            { title: { [Op.iLike]: `%${search.trim()}%` } },
            { content: { [Op.iLike]: `%${search.trim()}%` } }
        ];
    }

    // Sort options
    let orderBy = [['created_at', 'DESC']]; // default
    if (sort_by === 'likes') {
        orderBy = [[literal('(SELECT COUNT(*) FROM "like" WHERE "like".target_id = post.id AND "like".is_post = true)'), sort_order]];
    } else if (sort_by === 'stars') {
        orderBy = [['stars', sort_order]];
    } else if (sort_by === 'title') {
        orderBy = [['title', sort_order]];
    }

    // ✅ Tách count và findAll riêng biệt
    
    // Count total posts (without includes to avoid conflicts)
    const totalCount = await Post.count({
        where: whereClause,
        distinct: true
    });

    // Get posts with all includes
    const posts = await Post.findAll({
        attributes: {
            include: [
                [literal('(SELECT COUNT(*) FROM "like" WHERE "like".target_id = post.id AND "like".is_post = true)'), 'likes'],
                [literal('(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)'), 'commentCount']
            ]
        },
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'avatar_path'],
                as: 'user'
            },
            {
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Place,
                attributes: ['id', 'name', 'address', 'average_stars']
            },
            {
                model: Like, as: 'like', attributes: ['user_id'],
                where: {
                    is_post: true
                },
                required: false
            }
        ],
        where: whereClause,
        order: orderBy,
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
        posts: posts,
        pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: totalCount,
            itemsPerPage: parseInt(limit),
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    };
};
module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    getPostByIdPlace,
    getPostByIdUser,
    getPostsByCategory,
    updatePost,
    getTopPostsByLikes,
    getNewestPosts,
    getInactivePosts,
    togglePostActiveStatus,
    deletePostById,
    getPostByCategory,
    getAllPostsWithPagination
};


