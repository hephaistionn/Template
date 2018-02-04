const route = require('express').Router();
const me = require('./routes/me');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const update = require('./routes/update');
const get = require('./routes/get');

module.exports = route.use('/members/', me, login, logout, signup, update, get);
