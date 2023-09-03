const express = require('express'); // Import the Express.js framework
const router = express.Router(); // Create an Express Router

// Define route handlers for the root path and the '/file' path
router.use('/', require('./home')); // Include the 'home' route handlers
router.use('/file', require('./file')); // Include the 'file' route handlers

module.exports = router; // Export the router for use in other parts of the application
