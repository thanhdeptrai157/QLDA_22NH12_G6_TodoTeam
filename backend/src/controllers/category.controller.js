const categoryService = require('../services/category.service');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).send({ message: 'Success', data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const getCategoriesWithPostCount = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategoriesWithPostCount();
    res.status(200).send({ message: 'Success', data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const getCategoriesWithDetails = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategoriesWithDetails();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getTopCategory = async (req, res) => {
    try {
        const topCategory = await categoryService.getTopCategory();
        res.status(200).json({
            success: true,
            data: topCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
  getCategories,
  getCategoriesWithPostCount,
  getCategoriesWithDetails,
  getTopCategory
};
