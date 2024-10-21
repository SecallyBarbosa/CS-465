const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define the route for /trips (with a leading slash)
router.route('/trips')
    .get(tripsController.tripsList)  // GET method for tripsList
    .post(tripsController.tripsAddTrip); // Post Method Adds a Trip

// Get Method routes tripsFindByCode - require parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

    module.exports = router;