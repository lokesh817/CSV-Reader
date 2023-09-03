// Import required modules
const File = require('../models/Files'); // Import the File model for database interaction
const path = require('path'); // Path module for file paths
const fs = require('fs'); // File system module

// Handle file uploads
module.exports.uploads = async (req, res) => {
  try {
    // Use Multer to handle file uploads
    File.uploadFile(req, res, async (err) => {
      if (err) {
        console.log('***multer error:', err);
        return res.status(500).send('Multer Error');
      }

      try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
          return res.status(400).send('No file uploaded.');
        }

        const fileExtension = path.extname(uploadedFile.originalname);

        if (fileExtension.toLowerCase() !== '.csv') {
          // Delete the uploaded file if it's not a CSV
          fs.unlinkSync(uploadedFile.path);
          return res.status(400).send('Invalid file format. Please upload a CSV file.');
        }

        // Create a record of the uploaded file in the database
        const createdFile = await File.create({
          name: req.body.filename,
          csv: File.FilePath + '/' + req.file.filename,
        });

        return res.redirect('back');
      } catch (error) {
        console.log('Database error:', error);
        return res.status(500).send('Database Error');
      }
    });
  } catch (error) {
    console.log('Error somewhere:', error);
    return res.status(500).send('Server Error');
  }
};

// Delete an uploaded CSV file
module.exports.deleteCSV = async function (req, res) {
  try {
    const fileId = req.query.id; // Assuming you pass the file ID as a query parameter

    const fileToDelete = await File.findById(fileId);
    if (!fileToDelete) {
      return res.status(404).send('File not found.');
    }
    const uploadedFilePath = fileToDelete.csv;

    // Delete the file from the filesystem
    fs.unlinkSync(path.join(__dirname, '..', uploadedFilePath));

    // Delete the file record from the database
    await File.findByIdAndDelete(fileId);

    return res.redirect('back');
  } catch (error) {
    console.log('Delete error:', error);
    return res.status(500).send('Delete Error');
  }
};

// Render a view for viewing CSV data
module.exports.viewCSV = function (req, res) {
  res.render('view_csv', {
    title: 'View CSV',
    csvData: req.csvData,
    name: req.filename,
  });
};
