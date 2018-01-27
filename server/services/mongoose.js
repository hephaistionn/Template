const mongoose = require('mongoose');
const conf = require('../conf');

mongoose.connect(conf.URI);
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('database connected  !'));

module.exports = db;

