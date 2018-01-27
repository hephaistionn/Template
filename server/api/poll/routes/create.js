const router = require('express').Router();
const Poll = require('../model');

function* create(req, res) {

    const model = req.body;

    const intance = new Poll(model);

    const poll = yield intance.save();

    res.send(poll);
}

module.exports = router.post('/', create);