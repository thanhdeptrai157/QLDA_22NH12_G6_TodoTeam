const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

router.get('/get_places', placeController.getPlaces);

module.exports = router;
