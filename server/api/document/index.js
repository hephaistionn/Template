const route = require('express').Router();
const upload = require('./routes/upload');

module.exports = route.use('/documents/', upload);
