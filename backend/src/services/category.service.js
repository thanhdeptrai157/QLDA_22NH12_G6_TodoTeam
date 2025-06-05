const { Post, Category, Place } = require('../models');
const { fn, col } = require('sequelize');
const Sequelize = require('sequelize');
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
const getAllCategoriesWithDetails = async () => {
  try {
    // Lấy categories với count posts
    const categories = await Category.findAll({
      attributes: [
        'id',
        'name',
        'description',
        [fn('COUNT', col('posts.id')), 'count']
      ],
      include: [{
        model: Post,
        attributes: [],
        required: false
      }],
      group: ['category.id', 'category.name', 'category.description'],
      order: [['name', 'ASC']]
    });

    // Lấy featured places cho mỗi category
    const result = await Promise.all(categories.map(async (category) => {
      // Query riêng cho featured places để tránh conflict
      const featuredPlacesQuery = `
                SELECT p.id, p.name, COUNT(posts.id) as post_count
                FROM place p
                INNER JOIN post posts ON p.id = posts.place_id
                WHERE posts.category_id = :categoryId
                GROUP BY p.id, p.name
                HAVING COUNT(posts.id) > 0
                ORDER BY COUNT(posts.id) DESC
                LIMIT 5
            `;

      const featuredPlacesResult = await Place.sequelize.query(featuredPlacesQuery, {
        replacements: { categoryId: category.id },
        type: Sequelize.QueryTypes.SELECT
      });

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        count: parseInt(category.dataValues.count) || 0,
        featuredPlaces: featuredPlacesResult.map(place => ({ name: place.name,
          id: place.id
        }))
      };
    }));

    return result;
  } catch (error) {
    throw new Error('Error fetching categories with details: ' + error.message);
  }
};
const getTopCategory = async (limit = 3) => {
  try {
    const topCategory = await Category.findAll({
      attributes: [
        'id',
        'name',
        "description",
      ],
      include: [{
        model: Post,
        attributes: [],
        required: false
      }],
      group: ['category.id', 'category.name', 'category.description'],
      order: [[fn('COUNT', col('posts.id')), 'DESC']],
      limit: limit,
      subQuery: false
    });
    console.log(topCategory);
    return topCategory;
  } catch (error) {
    console.error('Error fetching top category:', error);
    throw new Error('Error fetching top category: ' + error.message);
  }
}
module.exports = {
  getAllCategories,
  getAllCategoriesWithPostCount,
  getAllCategoriesWithDetails,
  getTopCategory
};