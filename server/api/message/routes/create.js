const router = require('express').Router();
const Message = require('../model');

function* create(req, res) {

    const model = req.body;

    const intance = new Message(model);

    const message = yield intance.save();

    res.send(message);

}

module.exports = router.post('/', create);