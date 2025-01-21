import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleSelection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState({});
  const [distribution, setDistribution] = useState(null);
  
  // Fetch vehicle categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        const uniqueCategories = [...new Set(response.data.map(car => car.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching vehicle categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Handle input change for each category
  const handleInputChange = (category, event) => {
    const value = event.target.value;
    setSelectedVehicles({
      ...selectedVehicles,
      [category]: value,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (event) => {

    try {
      const response = await axios.post('http://localhost:3001/api/select-cars', selectedVehicles);
      setDistribution(response.data);  // Store the distributed vehicles in state
    } catch (error) {
      console.error('Error submitting car selections:', error);
    }
  };

  return (
    <div>
      <h2>Select Vehicles</h2>
      <form onSubmit={handleSubmit}>
        {categories.map((category) => (
          <div key={category}>
            <label>{category}</label>
            <input
              type="number"
              value={selectedVehicles[category] || 0}
              onChange={(event) => handleInputChange(category, event)}
              min="0"
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {distribution && (
        <div>
          <h2>Vehicle Distribution</h2>
          {distribution.placedVehicles.map((vehicle, index) => (
            <div key={index}>
              <p>Category: {vehicle.category}</p>
              <p>Weight: {vehicle.weight} lbs</p>
              <p>Position: {vehicle.position}</p>
              <p>Axle Type: {vehicle.axleType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleSelection;