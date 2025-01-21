const mongoose = require('mongoose');
//This brings in the Mongoose library, which is essential for creating the schema and model.

const carSchema = new mongoose.Schema({
  category: { type: String, required: true },  
  weight: { type: Number, required: true },  
});
//This creates a new Mongoose schema, defining the structure of the Car documents (e.g., category, weight).


const Car = mongoose.model('Car', carSchema);
//This creates a Mongoose model (Car), which is used to interact with the MongoDB database for CRUD operations.


module.exports = Car;
