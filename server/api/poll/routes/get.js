const router = require('express').Router();
const Poll = require('../model');

function* get(req, res) {

    const condition = { _id: req.params.id };

    const poll = yield Poll.findOne(condition);

    res.send(poll);
}

module.exports = router.get('/:id*?', get);
