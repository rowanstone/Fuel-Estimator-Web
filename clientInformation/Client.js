// Client.js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment-fix');

var connection = mongoose.createConnection('mongodb://user:cs3320!@ds111430.mlab.com:11430/cs3320', { useNewUrlParser: true });

autoIncrement.initialize(connection);

var ClientSchema = new Schema({
    clientId: { type: Number, ref: 'ClientInformation' },
    deliveryContactName: String,
    deliveryAddress: String,
    deliveryCity: String,
    deliveryState: String,
    deliveryZipCode: String,
    deliveryContactPhone: String,
    deliveryContactEmail: { type: String}
});
ClientSchema.plugin(autoIncrement.plugin, {model:'ClientInformation', field: 'clientId'});
 mongoose.model('ClientInformation', ClientSchema);
module.exports = mongoose.model('ClientInformation');