const router = require('express').Router();
const Member = require('../model');

function* update(req, res){

    const condition = {_id: req.params.id};

    const update =  req.body;

    const option  =  {
        new: true,
        upsert: false,
        strict: true
    }

    const member = yield Member.findOneAndUpdate(condition, update, option);

    res.send(member);
}

module.exports = router.put('/:id', update);
