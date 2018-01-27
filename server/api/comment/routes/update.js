const router = require('express').Router();
const Comment = require('../model');

function* update(req, res){

    const condition = {_id: req.params.id};

    const updated =  req.body;

    const option  =  {
        new: true,
        upsert: false,
        strict: true
    }

    const comment = yield Comment.findOneAndUpdate(condition,updated, option);

    res.send(comment);
}

module.exports = router.put('/:id', update);
