// Import the Car model to get the vehicle details (optional if you need to fetch from DB)
const Car = require('../models/Car');

// Shuffle function to randomize an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Core function to handle the vehicle distribution logic
const distributeVehicles = async (vehicleCounts) => {
  try {
    // Fetch the vehicles (could be pre-fetched or use hardcoded data if needed)
    const cars = await Car.find();  // Fetch cars from the database

    // Map categories to their corresponding weights
    const categoryMap = cars.reduce((map, car) => {
      map[car.category] = car.weight;
      return map;
    }, {});

    // Shuffle the selected vehicles to randomize the order in which they will be placed
    const shuffledVehicleCounts = shuffleArray(Object.entries(vehicleCounts));

    // Define the positions (Example from your earlier setup)
    const positions = [
      { id: 1, axleType: 'steer', maxWeight: 14000, currentWeight: 9000, isOccupied: false },
      { id: 2, axleType: 'drive', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 3, axleType: 'drive', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 4, axleType: 'drive', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 5, axleType: 'trailer', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 6, axleType: 'trailer', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 7, axleType: 'drive', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 8, axleType: 'trailer', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
      { id: 9, axleType: 'trailer', maxWeight: 33000, currentWeight: 18000, isOccupied: false },
    ];

    let placedVehicles = [];  // Array to hold placed vehicles
    const axleWeights = {
      steer: 9000,
      drive: 18000,
      trailer: 18000,
    };

    // Define restricted categories for each position
    const restrictedCategories = {
      1: ['Quarter Ton Truck', 'Half Ton Truck', 'Three Quarter Ton Truck', 'Large SUV', 'Jeep', 'Cargo-van'],
      3: ['Quarter Ton Truck', 'Half Ton Truck', 'Three Quarter Ton Truck', 'Large SUV', 'Jeep', 'Cargo-van', 'Convertible'],
      5: ['Quarter Ton Truck', 'Half Ton Truck', 'Three Quarter Ton Truck', 'Large SUV', 'Cargo-van'],
      7: ['Three Quarter Ton truck', 'Convertible', 'Cargo-van', 'Jeep'],
      8: ['Quarter Ton Truck', 'Half Ton Truck', 'Three Quarter Ton Truck', 'Large SUV', 'Jeep', 'Cargo-van', 'Convertible'],
      9: ['Quarter Ton Truck', 'Half Ton Truck', 'Three Quarter Ton Truck', 'Large SUV', 'Jeep', 'Cargo-van', 'Convertible'],
    };

    // Loop through the shuffled vehicle categories and quantities
    for (const [category, count] of shuffledVehicleCounts) {
      const vehicleWeight = categoryMap[category];
      let placedCount = 0;

      // Loop to place each vehicle of the selected category
      for (let i = 0; i < count; i++) {
        let placed = false;

        // Try to place the vehicle in one of the positions
        for (let pos of positions) {
          // If the category is restricted for the position, skip placing it
          if (restrictedCategories[pos.id] && restrictedCategories[pos.id].includes(category)) {
            continue;
          }

          // Check if the position is available and the vehicle can fit
          if (!pos.isOccupied && pos.currentWeight + vehicleWeight <= pos.maxWeight) {
            pos.currentWeight += vehicleWeight;
            pos.isOccupied = true;

            // Log the placed vehicle and its details
            placedVehicles.push({
              category,
              weight: vehicleWeight,
              position: pos.id,
              axleType: pos.axleType,
            });

            // Add the vehicle weight to the axle type total
            axleWeights[pos.axleType] += vehicleWeight;  
            placed = true;
            placedCount++;
            break;
          }
        }

        // If the vehicle could not be placed, log that info
        if (!placed) {
          console.log(`Could not place vehicle of category ${category}.`);
        }
      }

      // Log the final status of vehicle placement for the category
      if (placedCount === count) {
        console.log(`All ${count} vehicles of category ${category} successfully placed.`);
      } else {
        console.log(`Some vehicles of category ${category} could not be placed.`);
      }
    }

    // Return the placed vehicles and axle weights
    return { placedVehicles, axleWeights };

  } catch (error) {
    console.error(error);
    throw new Error('Error during vehicle distribution');
  }
};

// Export the service
module.exports = {
  distributeVehicles
};
