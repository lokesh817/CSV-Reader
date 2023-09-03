const mongoose = require('mongoose'); // Import the mongoose library for MongoDB interaction
const multer = require('multer'); // Import the multer library for file uploads
const path = require('path'); // Import the path module for file path manipulation

const CSV_Path = path.join('/upload/Files'); // Define the path for storing CSV files

// Define the schema for the 'File' model
const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    csv: {
      type: String,
    },
  },
  { timestamps: true } // Enable timestamps for created and updated dates
);

// Configure multer for file storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', CSV_Path)); // Set the destination path for storing uploaded files
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file (appending a timestamp)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Define static methods for the 'File' model
FileSchema.statics.uploadFile = multer({ storage: storage }).single('File'); // Configure multer to handle single file uploads
FileSchema.statics.FilePath = CSV_Path; // Define a static property for the CSV file path

// Create the 'File' model using the schema
const File = mongoose.model('File', FileSchema);

module.exports = File; // Export the 'File' model
