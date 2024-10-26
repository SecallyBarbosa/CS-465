const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {

    const authHeader = req.headers['authorization'];

    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];

    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified;
        });
        next();
}

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router
    .route('/register')
    .post(authController.register);

router
    .route('/login')
    .post(authController.login);

// Define the route for /trips (with a leading slash)
router.route('/trips')
    .get(tripsController.tripsList)  // GET method for tripsList
    .post(authenticateJWT, tripsController.tripsAddTrip); // Post Method Adds a Trip

// Get Method routes tripsFindByCode - require parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

    module.exports = router;