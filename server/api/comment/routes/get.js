const router = require('express').Router();
const Comment = require('../model');

function* get(req, res) {

    const condition = { _id: req.params.id };

    const comment = yield Comment.findOne(condition);

    res.send(comment);
}

module.exports = router.get('/:id*?', get);
