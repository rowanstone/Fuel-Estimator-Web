//The first line declares a variable which will contain the module called express, grabbing it from the node_modules folder.
var express = require('express');
//The module is actually a function. Assigning the function call to another variable gives you access to a predefined
// set of tools which will in a great deal make your life much easier.
var app = express();
var db = require('./db');


//ou’re requiring the user controller and with app.use telling the app to link it to the route /users.
// Now, the / route within your user controller will get mapped to /users.
var ClientController = require('./clientInformation/ClientController');
var QuotesController = require('./fuelQuote/QuotesController');
app.use('/clientInformation', ClientController);
app.use('/fuelQuote', QuotesController);

// We use module.exports to make this app object visible to the rest of the program when we call for it using require().
module.exports = app;

