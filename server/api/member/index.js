const route = require('express').Router();
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const update = require('./routes/update');
const get = require('./routes/get');

module.exports = route.use('/members/', login, logout, signup, update, get);
