const placeService = require('../services/place.service');

const getPlaces = async (req, res) => {
  try {
    const places = await placeService.getAllPlaces();
    res.status(200).send({ message: 'Success', data: places });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getPlaces,
};
