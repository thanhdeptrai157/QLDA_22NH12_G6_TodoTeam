const { Op } = require('sequelize');
const { Post, Place, User, Category, Like } = require('../models');

const getPostIncludes = () => [
    { model: User, attributes: ['id', 'name', 'email'] },
    { model: Category, attributes: ['id', 'name'] },
    { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
    {
        model: Like,
        as: 'like',
        attributes: ['id', 'user_id', 'target_id'],
        where: { is_post: true },
        required: false
    }
];

exports.findByLocation = async (locationName) => {
    if (!locationName || locationName.trim() === "") {
        return [];
    }

    const places = await Place.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${locationName}%` } },
                { address: { [Op.iLike]: `%${locationName}%` } }
            ]
        },
        attributes: ['id']
    });

    if (places.length === 0) {
        return [];
    }
    const placeIds = places.map(place => place.id);

    return await Post.findAll({
        where: { place_id: { [Op.in]: placeIds } },
        include: getPostIncludes(),
        order: [['created_at', 'DESC']]
    });
};

exports.findByCategory = async (category_id) => {
    if (!category_id) {
        return [];
    }
    return await Post.findAll({
        where: { category_id: parseInt(category_id) },
        include: getPostIncludes(),
        order: [['created_at', 'DESC']]
    });
};

exports.advancedSearch = async ({ locationName, category_id, stars }) => {
    const queryOptions = {
        where: {},
        include: getPostIncludes(),
        order: [['created_at', 'DESC']],
    };

    // Tìm theo địa điểm (name hoặc address)
    if (locationName && locationName.trim() !== "") {
        const places = await Place.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${locationName}%` } },
                    { address: { [Op.iLike]: `%${locationName}%` } }
                ]
            },
            attributes: ['id']
        });
        if (places.length === 0) {
            return [];
        }
        const placeIds = places.map(place => place.id);
        queryOptions.where.place_id = { [Op.in]: placeIds };
    }

    // Lọc theo category nếu có
    if (category_id && String(category_id).toLowerCase() !== 'all') {
        queryOptions.where.category_id = parseInt(category_id);
    }

    // Lọc theo số sao nếu có
    if (stars) {
        const parsedStars = parseInt(stars);
        if (!isNaN(parsedStars) && parsedStars >= 1 && parsedStars <= 5) {
            queryOptions.where.stars = parsedStars;
        }
    }

    return await Post.findAll(queryOptions);
};