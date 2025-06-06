const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

router.get('/', placeController.getPlaces);
router.get('/trending', placeController.getTrendingPlaces);
router.get('/recent', placeController.getRecentPlaces);
router.get('/top-rated', placeController.getTopRatedPlaces);
router.get('/popular', placeController.getPopularPlaces);
router.get('/:id', placeController.getPlaceById);
module.exports = router;
