const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');
const User = require('./user');
const Place = require('./place');
const Category = require('./category');

User.hasMany(Post, { foreignKey: 'userid' });
Post.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

Post.belongsTo(Category, { foreignKey: 'category_id' });
Post.belongsTo(Place, { foreignKey: 'place_id' });

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });
User.sync();
Post.sync();
Comment.sync();
Place.sync();
Category.sync();
Like.sync();
module.exports = { User, Post, Comment, Like, Category, Place };
