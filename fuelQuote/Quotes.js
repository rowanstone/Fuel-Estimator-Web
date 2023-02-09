// Quotes.js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment-fix');

var connection = mongoose.createConnection('mongodb://user:cs3320!@ds111430.mlab.com:11430/cs3320', { useNewUrlParser: true });

autoIncrement.initialize(connection);

var QuoteSchema = new mongoose.Schema({
    quoteId: { type: Number, ref: 'FuelQuote' },
    clientId: Number,
    gallonsRequested: mongoose.Decimal128,
    requestDate: Date,
    deliveryDate: Date,
    deliveryAddress: String,
    deliveryCity: String,
    deliveryState: String,
    deliveryZipCode: String,
    deliveryContactName: String,
    deliveryContactPhone: String,
    deliveryContactEmail: String,
    suggestedPrice: mongoose.Decimal128,
    totalAmountDue: mongoose.Decimal128,
});

QuoteSchema.plugin(autoIncrement.plugin, {model:'FuelQuote', field: 'quoteId'});
mongoose.model('FuelQuote', QuoteSchema);
module.exports = mongoose.model('FuelQuote');