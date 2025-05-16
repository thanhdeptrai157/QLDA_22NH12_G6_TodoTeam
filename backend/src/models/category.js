const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Category = sequelize.define('category', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, unique: true, allowNull: false }
  }, {
    tableName: 'category',
    timestamps: false
});
module.exports = Category