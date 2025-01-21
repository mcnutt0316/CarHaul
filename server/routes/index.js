const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController'); // Import carController
const vehicleDistributionController = require('../controllers/vehicleDistributionController'); // Import new distribution controller

// POST route to receive selected cars data and distribute them
router.post('/select-cars', vehicleDistributionController.distribute);  // Use distribute function for vehicle distribution

// Route to get all cars (can be used for fetching cars in React)
router.get('/cars', carController.getAllCars);  // Fetch all cars

// Route to get a single car by ID
router.get('/cars/:id', carController.getCarById);  // Fetch a specific car by its ID

module.exports = router;

