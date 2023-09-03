const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express Router instance
const { home } = require('../controller/home_controller'); // Import the home controller function

// Define a route for the home page using a GET request
router.get('/', home);

module.exports = router; // Export the router for use in other parts of the application
