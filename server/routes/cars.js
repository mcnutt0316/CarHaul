const express = require('express');
const router = express.Router();
const Car = require('../models/Car');  // Import the Car model

// Route to fetch all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();  // Fetch all cars from MongoDB
    res.json(cars);  // Return cars as JSON for React to consume
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to get a single car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id); // Find car by ID
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);  // Return car data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
