const Place = require('../models');

const getAllPlaces = async () => {
  return await Place.findAll();
};

module.exports = {
  getAllPlaces,
};
