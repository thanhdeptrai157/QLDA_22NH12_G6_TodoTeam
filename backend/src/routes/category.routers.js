const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
router.get('/top', categoryController.getTopCategory);
router.get('/', categoryController.getCategories);
router.get('/with-post-count', categoryController.getCategoriesWithPostCount);
router.get('/with-details', categoryController.getCategoriesWithDetails);

module.exports = router;
