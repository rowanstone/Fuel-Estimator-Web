// QuotesController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Quote = new require('./Quotes.js');

// CREATES A NEW QUOTE
router.post('/', function (req, res) {
    Quote.create({
            clientId: req.body.clientId,
            gallonsRequested: req.body.gallonsRequested,
            //requestDate: req.body.requestDate,
            requestDate: new Date(),
            deliveryDate: req.body.deliveryDate,
            deliveryAddress: req.body.deliveryAddress,
            deliveryCity: req.body.deliveryCity,
            deliveryState: req.body.deliveryState,
            deliveryZipCode: req.body.deliveryZipCode,
            deliveryContactName : req.body.deliveryContactName,
            deliveryContactPhone : req.body.deliveryContactPhone,
            deliveryContactEmail: req.body.deliveryContactEmail,
            suggestedPrice: req.body.suggestedPrice,
            totalAmountDue: req.body.totalAmountDue
        },
        function (err, quote) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(quote);
        });
});
// RETURNS ALL THE QUOTES IN THE DATABASE
router.get('/', function (req, res) {
    console.log(req.query);
    Quote.find(req.query, function (err, quotes) {
        if (err) return res.status(500).send("There was a problem finding the quotes.");
        res.status(200).send(quotes);
    });
});

// GETS A SINGLE QUOTE FROM THE DATABASE
/*router.get('/:id', function (req, res) {
    Quote.findById(req.params.id, function (err, quote) {
        if (err) return res.status(500).send("There was a problem finding the quote.");
        if (!quote) return res.status(404).send("No quote found.");
        res.status(200).send(quote);
    });
}); */

// DELETES A QUOTE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Quote.findByIdAndRemove(req.params.id, function (err, quote) {
        if (err) return res.status(500).send("There was a problem deleting the quote.");
        res.status(200).send("Quote "+ quote.name +" was deleted.");
    });
});

// UPDATES A SINGLE QUOTE IN THE DATABASE
router.put('/:id', function (req, res) {

    Quote.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, quote) {
        if (err) return res.status(500).send("There was a problem updating the quote.");
        res.status(200).send(quote);
    });
});

module.exports = router;