const router = require('express').Router();
const Message = require('../model');

function* update(req, res){

    const condition = {_id: req.params.id};

    const updated =  req.body;

    const option  =  {
        new: true,
        upsert: false,
        strict: true
    }

    const message = yield Message.findOneAndUpdate(condition, updated, option);

    res.send(message);
}

module.exports = router.put('/:id', update);
