const Place = require('../models/place');

const getAllPlaces = async () => {
  return await Place.findAll();
};

module.exports = {
  getAllPlaces,
};
