
const session = require('express-session');
const mongoose = require('../services/mongoose');
const MongoStore = require('connect-mongo')(session);

module.exports = session({
    secret: 'wipview',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose
    })
});

