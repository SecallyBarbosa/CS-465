const mongoose = require('mongoose');
const Trip = require('../models/travlr');  // Register Model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();  // Query all trips

        // If no trips are found, return a 404
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        // Return the list of trips with a 200 status
        return res.status(200).json(trips);

    } catch (err) {
        // Handle any errors (e.g., database connection issues)
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, reponse must include HTML status code
// and JSON message to requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
    .find({'code' : req.params.tripCode }) //Return single record
    .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);

if (!q)
{ // Databse returned no data
    return res
            .status(404)
            .json(err);
} else { //Return resulting trip list
    return res
    .status(200)
    .json(q);
}

};

module.exports = {
    tripsList,
    tripsFindByCode
};