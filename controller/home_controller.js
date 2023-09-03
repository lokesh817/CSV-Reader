// Import the Files model
const Files = require('../models/Files');

// Handle the home route to display a list of files
module.exports.home = async function (req, res) {
    try {
        // Retrieve all files from the database
        const files = await Files.find({});

        // Render the 'home' view with the list of files
        return res.render('home', {
            title: "Home",
            Files: files
        });
    } catch (error) {
        // Handle any errors by returning a 500 status and an error message
        return res.status(500).json({ message: "Bad Request" });
    }
};
