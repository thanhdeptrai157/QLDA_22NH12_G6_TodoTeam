const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');
const Place = sequelize.define(
  'place',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    average_stars: { type: Sequelize.DOUBLE, defaultValue: 0 },
    longitude: { type: Sequelize.DOUBLE, allowNull: true, // Cho phép NULL tạm thời
      defaultValue: null },
    latitude: { type: Sequelize.DOUBLE, allowNull: true, // Cho phép NULL tạm thời
      defaultValue: null },
  },
  {
    tableName: 'place',
    timestamps: false,
  },
);
Place.sync({ alter: true })
  .then(() => {
    console.log('Place table synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing Place table:', error);
  });
module.exports = Place;
