const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./server/config/db');  // DB config
const loadingRoutes = require('./server/routes'); // Routes
const errorHandler = require('./server/middleware/errorHandler'); // Error handling middleware

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB(); // Connect to the DB

// Routes
app.use('/api', loadingRoutes); // All routes start with `/api`

// Error handling middleware
app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.send('Home Page');
// });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


