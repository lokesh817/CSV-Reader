// Import required modules
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const expressLayouts=require('express-ejs-layouts');

// Load environment variables from .env file
dotenv.config();

// Set up the default port, or use the one from the environment variables
const port = process.env.PORT || 8000;

// Create an Express app
const app = express();

// using express layout
app.use(expressLayouts);
//using bootstrap
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'images')));
// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());


// Set up the default route using the index_route module
app.use('/', require('./routes/index_route'));
//set up view engine and set path views
app.set('view engine','ejs');
app.set('views','./views');

// Connect to the MongoDB database using the provided URL from environment variables
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // Start the server once the database connection is established
        app.listen(port, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to the database:", err);
    });
