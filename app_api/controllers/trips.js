const mongoose = require('mongoose');
const Trip = require('../models/travlr');  // Register Model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();

        // If no trips are found, return a 404
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ code: req.params.tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,  
            description: req.body.description
        });

        const savedTrip = await newTrip.save();

        if (!savedTrip) {
            return res.status(404).json({ message: 'Failed to add trip' });
        } else {
            return res.status(201).json(savedTrip);
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
        // Uncomment for debugging
        console.log(req.params);
        console.log(req.body);
        const q = await Model
            .findOneAndUpdate(
    {'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            )
    .exec();
           
    if(!q)
    { // Database returned no data
                return res
    .status(400)
                    .json(err);
    } else { // Return resulting updated trip
                return res
    .status(201)
                    .json(q);
            }    
                   
            // Uncomment the following line to show results of operation
            // on the console
            // console.log(q);
    };
    
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
