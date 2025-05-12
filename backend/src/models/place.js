const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Place = sequelize.define(
  'place',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    averagestars: { type: Sequelize.DOUBLE, defaultValue: 0 },
  },
  {
    tableName: 'place',
    timestamps: false,
  },
);
Place.sync();
module.exports = Place;
