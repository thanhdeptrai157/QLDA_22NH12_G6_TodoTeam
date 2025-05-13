// services/search.service.js
const { Op } = require('sequelize');
const Post = require('../models/post');
const Place = require('../models/place');

exports.findByLocation = async (locationName) => {
    const places = await Place.findAll({ 
        where: { 
            name: { [Op.like]: `%${locationName}%` } 
        } 
    });
    const placeIds = places.map(place => place.id);

    return await Post.findAll({ 
        where: { place_id: placeIds } 
    });
};


exports.findByCategory = async (category_id) => {
    return await Post.findAll({ where: { category_id } });
};


exports.advancedSearch = async ({ keyword, locationName, category_id, stars }) => {
    const query = { where: {} };

    if (keyword) query.where.title = { [Op.like]: `%${keyword}%` };
    if (locationName) {
        const places = await Place.findAll({ 
            where: { name: { [Op.like]: `%${locationName}%` } } 
        });
        const placeIds = places.map(place => place.id);
        query.where.place_id = placeIds;
    }
    if (category_id) query.where.category_id = category_id;
    if (stars) query.where.stars = stars;

    return await Post.findAll(query);
};
