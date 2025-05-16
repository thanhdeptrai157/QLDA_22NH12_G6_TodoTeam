const { Post, Category } = require('../models');
const sequelize = require('sequelize');
const { fn, col } = require('sequelize');
const getAllCategories = async () => {
  return await Category.findAll();
};
const getAllCategoriesWithPostCount = async () => {
  // return await Category.findAll({
  // attributes: [
  //   'id',
  //   'name',
  //   [sequelize.fn('COUNT', sequelize.col('posts.id')), 'postCount']
  // ],
  // include: [
  //   {
  //     model: Post,
  //     attributes: [],
  //     required: false,
  //   }
  // ],
  // group: ['category.id', 'category.name']
  // });
  const posts = await Post.findAll({
    attributes: ['category_id', 'place_id' , [fn('COUNT', col('category_id')), 'postCount']],
    group: ['category_id', 'place_id']
  });
  return posts
};

module.exports = {
  getAllCategories,
  getAllCategoriesWithPostCount,
};