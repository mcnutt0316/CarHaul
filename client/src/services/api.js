import axios from 'axios';

export const getVehicles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cars');
    return response.data;
  } catch (error) {
    throw error;
  }
};
