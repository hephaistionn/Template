const router = require('express').Router();
const Member = require('../model');

function* signup(req, res) {

    if (req.body.email && req.body.username && req.body.password) {
        const intance = new Member({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            level: 0
        });
        intance.owner = intance._id;

        const member = yield intance.save();

        res.send(member);

    } else {
        const err = new Error('params required');
        err.status = 401;
        return err;
    }

}

module.exports = router.post('/signup', signup);