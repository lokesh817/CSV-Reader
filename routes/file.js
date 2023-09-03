const express = require('express'); // Import the Express.js framework
const router = express.Router(); // Create a router object for defining routes
const { uploads, deleteCSV, viewCSV } = require("../controller/file_controller"); // Import controller functions
const csvParserMiddleware = require('../config/csvParserMiddleware'); // Import middleware for CSV parsing

// Define routes and associate them with controller functions and middleware
router.post('/upload', uploads); // Handle file uploads via POST request
router.get('/view', csvParserMiddleware, viewCSV); // Render a view for viewing CSV data via GET request
router.get('/delete', deleteCSV); // Delete an uploaded CSV file via GET request

module.exports = router; // Export the router for use in the application
