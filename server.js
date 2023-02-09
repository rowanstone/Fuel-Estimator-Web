// server.js

//Here you get to require the app and put it in a variable. This app is the actual app object you created in app.js.
var app = require('./app');
//Continue by choosing a port for the app to run on and finally spin up the server with app.listen.
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});