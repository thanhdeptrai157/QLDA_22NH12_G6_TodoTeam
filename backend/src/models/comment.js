const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Comment = sequelize.define('comment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: { type: Sequelize.INTEGER, allowNull: false },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    likes: { type: Sequelize.INTEGER, defaultValue: 0 },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    tableName: 'comment',
    timestamps: false
});

Comment.sync();
module.exports = Comment