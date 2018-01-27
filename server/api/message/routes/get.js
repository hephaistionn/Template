const router = require('express').Router();
const Message = require('../model');

function* get(req, res) {

    const condition = { _id: req.params.id };

    const message = yield Message.findOne(condition);

    res.send(message);
}

module.exports = router.get('/:id', get);
