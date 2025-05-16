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
module.exports = {
  getCategories,
  getCategoriesWithPostCount,
};
