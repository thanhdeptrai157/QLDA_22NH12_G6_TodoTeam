// routes/search.routes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');

router.get('/location', searchController.searchByLocation);
router.get('/category', searchController.searchByCategory);
router.get('/advanced', searchController.advancedSearch);

module.exports = router;