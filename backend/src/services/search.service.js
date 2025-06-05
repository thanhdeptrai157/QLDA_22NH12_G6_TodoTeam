// services/search.service.js
const { Op } = require('sequelize');
const { Post, Place, User, Category, Like } = require('../models'); // Đảm bảo import đủ

// Helper function để định nghĩa các includes chung cho Post
const getPostIncludes = () => [
    { model: User, attributes: ['id', 'name', 'email'] },
    { model: Category, attributes: ['id', 'name'] },
    { model: Place, attributes: ['id', 'name', 'address', 'average_stars'] },
    {
        model: Like,
        as: 'like', // Phải khớp với alias trong Post model's association
        attributes: ['id', 'user_id', 'post_id'], // Các trường PostCard cần từ Like
        required: false // Trả về post ngay cả khi không có like
    }
];

exports.findByLocation = async (locationName) => {
    if (!locationName || locationName.trim() === "") {
        return [];
    }

    const places = await Place.findAll({
        where: { name: { [Op.iLike]: `%${locationName}%` } },
        attributes: ['id'] // Chỉ cần ID của place
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

exports.advancedSearch = async ({ keyword, locationName, address, category_id, stars }) => {
    const queryOptions = {
        where: {},
        include: getPostIncludes(),
        order: [['created_at', 'DESC']],
    };

    if (keyword && keyword.trim() !== "") {
        queryOptions.where[Op.or] = [
            { title: { [Op.iLike]: `%${keyword}%` } },
            { content: { [Op.iLike]: `%${keyword}%` } }
        ];
    }

    const placeConditions = {};
    if (locationName && locationName.trim() !== "") {
        placeConditions.name = { [Op.iLike]: `%${locationName}%` };
    }
    if (address && address.trim() !== "") {
        placeConditions.address = { [Op.iLike]: `%${address}%` };
    }

    if (Object.keys(placeConditions).length > 0) {
        const places = await Place.findAll({ where: placeConditions, attributes: ['id'] });
        if (places.length === 0) {
            return []; // Không tìm thấy Place, không có Post để trả về
        }
        const placeIds = places.map(place => place.id);
        queryOptions.where.place_id = { [Op.in]: placeIds };
    }

    if (category_id && String(category_id).toLowerCase() !== 'all') {
        queryOptions.where.category_id = parseInt(category_id);
    }

    if (stars) {
        const parsedStars = parseInt(stars);
        if (!isNaN(parsedStars) && parsedStars >= 1 && parsedStars <= 5) {
            queryOptions.where.stars = parsedStars;
        }
    }
    
    // Trả về tất cả các post khớp điều kiện, không phân trang
    return await Post.findAll(queryOptions);
};