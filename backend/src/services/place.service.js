const { Place, Post, User, Category } = require('../models');

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

module.exports = {
  getAllPlaces,
  getPlaceById,
  getNeighboringPlaces,
};
