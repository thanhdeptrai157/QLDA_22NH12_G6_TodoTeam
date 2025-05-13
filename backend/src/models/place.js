const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Place = sequelize.define(
  'place',
  {
    id: { type: Sequelize.STRING, primaryKey: true},
    name: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    average_stars: { type: Sequelize.DOUBLE, defaultValue: 0 },
  },
  {
    tableName: 'place',
    timestamps: false,
  },
);
Place.sync();
module.exports = Place;
