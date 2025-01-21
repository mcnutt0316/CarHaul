function errorHandler(err, req, res, next) {
  console.error(err.stack);  // Log error stack for debugging
  res.status(500).send('Something went wrong!');
}

module.exports = errorHandler;  // Make sure it's exported properly
