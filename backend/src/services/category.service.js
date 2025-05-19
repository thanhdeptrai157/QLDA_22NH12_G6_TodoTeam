const { Post, Category } = require('../models');
const sequelize = require('sequelize');
const { fn, col } = require('sequelize');
const getAllCategories = async () => {
  return await Category.findAll();
};
const getAllCategoriesWithPostCount = async () => {
  return await Category.findAll({
    attributes: [
      'id',
      'name',
      [fn('COUNT', col('posts.id')), 'postCount']
    ],
    include: [
      {
        model: Post,
        attributes: [],
        required: false,
      }
    ],
    group: ['category.id'],
    order: [['id', 'ASC']]
  });
};

module.exports = {
  getAllCategories,
  getAllCategoriesWithPostCount,
};