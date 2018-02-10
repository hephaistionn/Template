const router = require('express').Router();
const Member = require('../model');
const mongoose = require('mongoose');

function* signup(req, res) {
    if (req.body.email && req.body.username && req.body.password) {
        const intance = new Member({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            token: mongoose.Types.ObjectId().toString().substr(-5),
            tokendate: new Date(),
            verified: false,
            level: 0
        });
        intance.owner = intance._id;
        yield intance.save();

        res.send('success');

    } else {
        const err = new Error('params required');
        err.status = 400;
        return err;
    }

}

module.exports = router.post('/signup', signup);