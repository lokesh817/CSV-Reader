// Import required modules
const csv = require('csv-parser'); // CSV parsing library
const fs = require('fs'); // File system module
const path = require('path'); // Path module for file paths
const File = require('../models/Files'); // Import the File model for database interaction

// Define and export an asynchronous middleware function
module.exports = async function (req, res, next) {
  
  // Find the File document in the database using the provided query parameter (_id)
  const csvfile = await File.findOne({ _id: req.query.id });

  // Construct the file path to the CSV file using the module path
  const csvFilePath = path.join(__dirname, '..', csvfile.csv); // Assuming you send file path as query parameter

  // Create an empty array to store the CSV data
  const data = [];

  // Read the CSV file using a readable stream, parse it with csv-parser, and handle events
  fs.createReadStream(csvFilePath)
    .pipe(csv()) // Use csv-parser to parse the CSV data
    .on('data', (row) => {
      data.push(row); // Push each row of data into the 'data' array
    })
    .on('end', () => {
      // When the CSV parsing is complete, set the parsed data and filename as request properties
      req.csvData = data; // Attach parsed data to the request object
      req.filename = csvfile.name; // Attach the filename from the database to the request object
      next(); // Call the next middleware in the chain
    });
};
