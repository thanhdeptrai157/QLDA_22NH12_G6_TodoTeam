const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Post = sequelize.define('post', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    place_id: { type: Sequelize.INTEGER },
    stars: { type: Sequelize.INTEGER },
    category_id: { type: Sequelize.INTEGER },
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    likes: { type: Sequelize.INTEGER, defaultValue: 0 },
    image: { type: Sequelize.STRING }, 
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    status: { type: Sequelize.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'post',
    timestamps: false
});
Post.sync()
module.exports = Post