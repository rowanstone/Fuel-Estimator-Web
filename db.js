// db.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:cs3320!@ds111430.mlab.com:11430/cs3320', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
