const sequelize = require('../config/database');

// Import models
const User = require('./user');
const Place = require('./place');
const Category = require('./category');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');

// Định nghĩa quan hệ
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

Category.hasMany(Post, { foreignKey: 'category_id' });

Post.belongsTo(Category, { foreignKey: 'category_id' });
Post.belongsTo(Place, { foreignKey: 'place_id' });

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync();

module.exports = { User, Post, Comment, Like, Category, Place };