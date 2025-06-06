const { Place, Post, User, Category } = require('../models');
const { fn, col, Op, literal } = require('sequelize');
const Sequelize = require('sequelize');
const getAllPlaces = async () => {
  // Lấy tất cả địa điểm
  const places = await Place.findAll();

  // Lấy 1 vài ảnh từ các post liên quan cho mỗi place
  const placesWithImages = await Promise.all(
    places.map(async (place) => {
      // Lấy tối đa 3 post mới nhất có ảnh
      const posts = await Post.findAll({
        where: { place_id: place.id },
        attributes: ['image'],
        order: [['created_at', 'DESC']],
        limit: 3
      });
      // Lấy các ảnh đầu tiên của mỗi post (nếu có)
      const images = posts
        .map(post => Array.isArray(post.image) && post.image.length > 0 ? post.image[0] : null)
        .filter(Boolean);
      return {
        ...place.toJSON(),
        images
      };
    })
  );
  return placesWithImages;
};

const getPlaceById = async (id) => {
  // Lấy thông tin địa điểm
  const place = await Place.findOne({
    where: { id },
  });
  if (!place) return null;

  // Lấy các bài viết tại địa điểm này
  const posts = await Post.findAll({
    where: { place_id: id },
    include: [
      { model: User, attributes: ['id', 'name', 'email'] },
      { model: Category, attributes: ['id', 'name'] },
    ],
    order: [['created_at', 'DESC']]
  });

  // Trả về thông tin địa điểm, số lượng bài viết và danh sách bài viết
  return {
    ...place.toJSON(),
    postCount: posts.length,
    posts: posts
  };
};

const getNeighboringPlaces = async (latitude, longitude, radius = 5000) => {
  // Tính khoảng cách giữa hai điểm trên bề mặt trái đất
  // 5000 = 5 km
  return await Place.findAll({
    where: {
      latitude: {
        [Op.between]: [latitude - radius / 111320, latitude + radius / 111320]
      },
      longitude: {
        [Op.between]: [longitude - radius / (111320 * Math.cos(latitude * Math.PI / 180)), longitude + radius / (111320 * Math.cos(latitude * Math.PI / 180))]
      }
    }
  });
};
const getTrendingPlaces = async (limit = 4) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const places = await Place.findAll({
    attributes: [
      'id',
      'name',
      'address',
      'average_stars'
    ],
    include: [{
      model: Post,
      attributes: [],
      where: {
        created_at: {
          [Op.gte]: oneMonthAgo
        },
        is_active: true
      },
      required: true
    }],
    group: ['place.id', 'place.name', 'place.address', 'place.average_stars'],
    having: literal('COUNT("posts"."id") > 0'),
    order: [
      [literal('COUNT("posts"."id")'), 'DESC'],
      ['average_stars', 'DESC']
    ],
    limit,
    subQuery: false
  });

  // ✅ Lấy images cho mỗi place
  const placesWithImages = await Promise.all(
    places.map(async (place) => {
      const posts = await Post.findAll({
        where: { place_id: place.id },
        attributes: ['image'],
        order: [['created_at', 'DESC']],
        limit: 3,
      });

      const images = posts
        .map(post => Array.isArray(post.image) && post.image.length > 0 ? post.image[0] : null)
        .filter(Boolean);

      return {
        id: place.id,
        name: place.name,
        address: place.address,
        rating: parseFloat(place.average_stars) || 0,
        image: images.length > 0 ? images[0] : "/placeholder.svg?height=300&width=400",
      };
    })
  );

  return placesWithImages;
};
// Lấy địa điểm mới nhất
const getRecentPlaces = async (limit = 6) => {
  const places = await Place.findAll({
    attributes: [
      'id',
      'name',
      'address',
      'average_stars',
      
    ],
    order: [['created_at', 'DESC']],
    limit,
  });

  const placesWithImages = await Promise.all(
    places.map(async (place) => {
      const posts = await Post.findAll({
        where: { place_id: place.id },
        attributes: ['image'],
        order: [['created_at', 'DESC']],
        limit: 3,
      });

      const images = posts
        .map(post => Array.isArray(post.image) && post.image.length > 0 ? post.image[0] : null)
        .filter(Boolean);

      return {
        id: place.id,
        name: place.name,
        address: place.address,
        rating: parseFloat(place.average_stars) || 0,
        image: images.length > 0 ? images[0] : "/placeholder.svg?height=300&width=400",
      };
    })
  );
  return placesWithImages;
};

// Lấy địa điểm đánh giá cao nhất
const getTopRatedPlaces = async (limit = 6) => {
  const places = await Place.findAll({
    attributes: [
      'id',
      'name',
      'address',
      'average_stars',
      [fn('COUNT', col('posts.id')), 'reviewCount']

    ],
    include: [{
      model: Post,
      attributes: [],
      where: {
        is_active: true
      },
      required: true
    }],
    group: ['place.id'],
    having: literal('COUNT(posts.id) >= 2'), // Ít nhất 2 review
    order: [
      ['average_stars', 'DESC'],
      [literal('COUNT(posts.id)'), 'DESC']
    ],
    limit,
    subQuery: false
  });

 const placesWithImages = await Promise.all(
    places.map(async (place) => {
      const posts = await Post.findAll({
        where: { place_id: place.id },
        attributes: ['image'],
        order: [['created_at', 'DESC']],
        limit: 3,
      });

      const images = posts
        .map(post => Array.isArray(post.image) && post.image.length > 0 ? post.image[0] : null)
        .filter(Boolean);

      return {
        id: place.id,
        name: place.name,
        address: place.address,
        rating: parseFloat(place.average_stars) || 0,
        image: images.length > 0 ? images[0] : "/placeholder.svg?height=300&width=400",
        reviewCount: parseInt(place.dataValues.reviewCount) || 0,
      };
    })
  );
  return placesWithImages;
};

// Lấy địa điểm phổ biến nhất (nhiều review nhất)
const getPopularPlaces = async (limit = 6) => {
  const places = await Place.findAll({
    attributes: [
      'id',
      'name',
      'address',
      'average_stars',
      [fn('COUNT', col('posts.id')), 'reviewCount']
      ],
    include: [{
      model: Post,
      as: 'posts',
      attributes: [],
      where: {
        is_active: true
      },
      required: true
    }],
    group: ['place.id'],
    order: [
      [literal('COUNT(posts.id)'), 'DESC'],
      ['average_stars', 'DESC']
    ],
    limit,
    subQuery: false
  });

  const placesWithImages = await Promise.all(
    places.map(async (place) => {
      const posts = await Post.findAll({
        where: { place_id: place.id },
        attributes: ['image'],
        order: [['created_at', 'DESC']],
        limit: 3,
      });

      const images = posts
        .map(post => Array.isArray(post.image) && post.image.length > 0 ? post.image[0] : null)
        .filter(Boolean);

      return {
        id: place.id,
        name: place.name,
        address: place.address,
        rating: parseFloat(place.average_stars) || 0,
        image: images.length > 0 ? images[0] : "/placeholder.svg?height=300&width=400",
        reviewCount: parseInt(place.dataValues.reviewCount) || 0,
      };
    })
  );
  return placesWithImages;
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  getNeighboringPlaces,
  getTrendingPlaces,
  getRecentPlaces,
  getTopRatedPlaces,
  getPopularPlaces
};
