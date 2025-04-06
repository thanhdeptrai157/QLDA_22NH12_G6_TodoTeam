const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Like = sequelize.define('like', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    is_post: { type: Sequelize.BOOLEAN },
    user_id: { type: Sequelize.INTEGER },
    target_id: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    tableName: 'like', 
    timestamps: false
});
Like.sync();
module.exports = Like;