const { distributeVehicles } = require('../services/vehicleDistributionService');  // Import distribution logic from a service

// Controller function to handle the form submission
const loadCars = async (req, res) => {
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

    // Distribute vehicles to positions based on their weight
    const { placedVehicles, axleWeights } = await distributeVehicles(vehicleCounts);

    // Return the assigned positions for each vehicle and axle weights (in pounds)
    res.status(200).json({
      message: 'Vehicles successfully loaded',
      loadPlan: placedVehicles,
      axleWeights: axleWeights, // Send axle weights as part of the response (in pounds)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Export controller function
module.exports = {
  loadCars
};
