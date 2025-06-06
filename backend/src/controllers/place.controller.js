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

const getPlaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const place = await placeService.getPlaceById(id);
    if (!place) {
      return res.status(404).send({ message: 'Place not found' });
    }
    res.status(200).send({ message: 'Success', data: place });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getNeighboringPlaces = async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).send({ message: 'Latitude and longitude are required' });
  }

  try {
    const places = await placeService.getNeighboringPlaces(latitude, longitude, radius);
    res.status(200).send({ message: 'Success', data: places });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}
const getTrendingPlaces = async (req, res) => {
  try {
    const places = await placeService.getTrendingPlaces();
    res.status(200).send({ message: 'Success', data: places });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const getRecentPlaces = async (req, res) => {
  try {
    const places = await placeService.getRecentPlaces();
    res.status(200).send({ message: 'Success', data: places });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const getTopRatedPlaces = async (req, res) => {
  try {
    const places = await placeService.getTopRatedPlaces();
    res.status(200).send({ message: 'Success', data: places });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const getPopularPlaces = async (req, res) => {
  try {
    const places = await placeService.getPopularPlaces();
    res.status(200).send({ message: 'Success', data: places });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getPlaces,
  getPlaceById,
  getNeighboringPlaces,
  getTrendingPlaces,
  getRecentPlaces,
  getTopRatedPlaces,
  getPopularPlaces

};
