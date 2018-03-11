const route = require('express').Router();
const get = require('./routes/get');
const create = require('./routes/create');
const update = require('./routes/update');
const remove = require('./routes/remove');

module.exports = route.use('/comments/', get, create, update, remove);
