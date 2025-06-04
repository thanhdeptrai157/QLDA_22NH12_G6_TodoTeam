const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: true },
    bio: { type: Sequelize.STRING, allowNull: true },
    phone: { type: Sequelize.STRING },
    role: { type: Sequelize.ENUM('user', 'admin'), defaultValue: 'user' },
    avatar_path: {
      type: Sequelize.STRING,
      field: 'avatar_path',
    },
    cover_path: {
      type: Sequelize.STRING,
      field: 'cover_path',
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      field: "is_active"
    }
  },
  {
    tableName: 'user',
    timestamps: false,
  },
);
module.exports = User;