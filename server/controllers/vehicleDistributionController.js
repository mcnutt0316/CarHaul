// Import the vehicle distribution service
const { distributeVehicles } = require('../services/vehicleDistributionService');  

// Controller function to handle vehicle distribution request
const distribute = async (req, res) => {
  try {
    const { selectedCars } = req.body;  // Extract the selected cars from the request body

    if (!selectedCars || selectedCars.length === 0) {
      return res.status(400).json({ message: 'No cars selected' });
    }

    // Build vehicle counts object from selectedCars
    let vehicleCounts = selectedCars.reduce((counts, car) => {
      counts[car.category] = car.quantity;
      return counts;
    }, {});

    // Delegate the actual distribution logic to the service
    const { placedVehicles, axleWeights } = await distributeVehicles(vehicleCounts);

    // Return the assigned positions for each vehicle and axle weights (in pounds)
    res.status(200).json({
      message: 'Vehicles successfully distributed',
      loadPlan: placedVehicles,
      axleWeights: axleWeights, // Send axle weights as part of the response (in pounds)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Export the distribute function
module.exports = {
  distribute
};
