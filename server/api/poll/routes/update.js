const router = require('express').Router();
const Poll = require('../model');
  
function* update(req, res){

    const condition = {_id: req.params.id};

    const updated =  req.body;

    const option  =  {
        new: true,
        upsert: false,
        strict: true
    }

    const poll = yield Poll.findOneAndUpdate(condition, updated, option);

    res.send(poll);
}

module.exports = router.put('/:id', update);
