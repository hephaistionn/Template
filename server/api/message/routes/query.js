const router = require('express').Router();
const Message = require('../model');

function* query(req, res) {

    const messages = yield Message.find();

    res.send(messages);
}

module.exports = router.get('/', query);

