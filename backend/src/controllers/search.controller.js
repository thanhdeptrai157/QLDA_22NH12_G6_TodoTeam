// controllers/search.controller.js
const searchService = require('../services/search.service');

const searchByLocation = async (req, res) => {
    try {
        const { locationName } = req.query;
        if (!locationName) {
            return res.status(400).json({ message: 'Location name is required' });
        }
        const posts = await searchService.findByLocation(locationName);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const searchByCategory = async (req, res) => {
    try {
        const { category_id } = req.query;
        if (!category_id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        const posts = await searchService.findByCategory(category_id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const advancedSearch = async (req, res) => {
    try {
        const { keyword, locationName, address, category_id, stars } = req.query;
        const searchParams = { keyword, locationName, address, category_id, stars };
        const posts = await searchService.advancedSearch(searchParams);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    searchByLocation,
    searchByCategory,
    advancedSearch
};