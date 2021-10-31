// Setup empty JS object to act as endpoint for all routes
projectData = {}

// Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("mime-db");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 5000;
const server = app.listen(port, listening);
function listening() {
  console.log(`server up and running on localhost:${port}`); // Callback to debug//
}

// Initialize all route with a callback function//
app.get("/all", getData)


// Callback function to complete GET '/all'//
function getData(req, res) {
  res.send(projectData);
};

// Post Route
app.post('/addData', addData);

function addData(req,res) {
    // console.log(req.body);
    newEntry= {
      temp: req.body.temp,
      date: req.body.date,
      userInput: req.body.input
    }  
    
    // console.log(newEntry);

    projectData = newEntry
    res.send(projectData)
    console.log(projectData)
}
