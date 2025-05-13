// controllers/search.controller.js
const searchService = require('../services/search.service');

exports.searchByLocation = async (req, res) => {
    try {
        const { locationName } = req.query;
        const posts = await searchService.findByLocation(locationName);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.searchByCategory = async (req, res) => {
    try {
        const { category_id } = req.query;
        const posts = await searchService.findByCategory(category_id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.advancedSearch = async (req, res) => {
    try {
        const { keyword, locationName, address, category_id, stars } = req.query;
        const posts = await searchService.advancedSearch({ keyword, locationName, address, category_id, stars });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};