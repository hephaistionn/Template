const router = require('express').Router();
const Comment = require('../model');

function* create(req, res) {

    const model = req.body;

    const intance = new Comment(model);

    const comment = yield intance.save();

    res.send(comment);

}

module.exports = router.post('/', create);