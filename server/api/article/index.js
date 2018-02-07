const route = require('express').Router();
const get = require('./routes/get');
const create = require('./routes/create');
const update = require('./routes/update');
const mailtest = require('./routes/mailtest');

module.exports = route.use('/articles/',mailtest, get, create, update);
