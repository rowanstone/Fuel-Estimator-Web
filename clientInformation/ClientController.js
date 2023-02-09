// ClientController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(function(req,res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var Client =  new require('./Client.js');

// CREATES A NEW CLIENT
router.post('/', function (req, res) {
    Client.create({
            deliveryAddress : req.body.deliveryAddress,
            deliveryCity: req.body.deliveryCity,
            deliveryState: req.body.deliveryState,
            deliveryZipCode: req.body.deliveryZipCode,
            deliveryContactName : req.body.deliveryContactName,
            deliveryContactPhone: req.body.deliveryContactPhone,
            deliveryContactEmail: req.body.deliveryContactEmail
        },
        function (err, client) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(client);
        });
});
// RETURNS A CLIENT FROM THE DATABASE. Do Not pass a query if all records need to be returned *** THIS WORKS. DO NOT CHANGE***
router.get('/', function (req, res) {
    console.log(req.query);
    Client.find(req.query, function (err, clients) {
        if (err) return res.status(500).send("There was a problem finding the clients.");
        res.status(200).send(clients);
    });
});

/*// GETS A SINGLE CLIENT FROM THE DATABASE By ID
router.get('/', function (req, res) {
    console.log(req.query);
    Client.findById(req.query, function (err, client) {
        if (err) return res.status(500).send("There was a problem finding the client.");
        if (!client) return res.status(404).send("No client found.");
        res.status(200).send(client);
    });
});

// GETS A SINGLE CLIENT FROM DATABASE BY EMAIL
router.get('/', function (req, res) {
    console.log(req.query);
    Client.findOne(req.query, function (err, client) {
        if (err) return res.status(500).send("There was a problem finding the client.");
        if (!client) return res.status(404).send("No client found.");
        res.status(200).send(client);
    });
}); */

// DELETES A CLIENT FROM THE DATABASE
router.delete('/:clientId', function (req, res) {
    Client.findByIdAndRemove(req.params.clientId, function (err, client) {
        if (err) return res.status(500).send("There was a problem deleting the client.");
        res.status(200).send("client "+ client.name +" was deleted.");
    });
});

// UPDATES A SINGLE CLIENT IN THE DATABASE
router.put('/:clientId', function (req, res) {

    Client.findByIdAndUpdate(req.params.clientId, req.body, {new: true}, function (err, client) {
        if (err) return res.status(500).send("There was a problem updating the client.");
        res.status(200).send(client);
    });
});

module.exports = router;