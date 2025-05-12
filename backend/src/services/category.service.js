const Category = require('../models/category');

const getAllCategories = async () => {
  return await Category.findAll();
};

module.exports = {
  getAllCategories,
};
