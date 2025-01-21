const Car = require('../models/Car');  // Import the Car model

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();  // Fetch all cars from MongoDB
    res.json(cars);  // Return cars as JSON for React to consume
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not fetch cars');
  }
};

// Get a single car by ID
const getCarById = async (req, res) => {
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
};

// Export the functions
module.exports = {
  getAllCars,
  getCarById
};
