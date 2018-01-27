const route = require('express').Router();
const get = require('./routes/get');
const create = require('./routes/create');
const update = require('./routes/update');

module.exports = route.use('/comments/', get, create, update);
