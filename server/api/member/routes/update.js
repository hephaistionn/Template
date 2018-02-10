const router = require('express').Router();
const Member = require('../model');

function* update(req, res){

    const query = {_id: req.params.id};

    const update =  req.body;

    // protected fields
    delete update.password;
    delete update.email;
    delete update.verified;
    delete update.token;
    delete update.tokendate;
    delete update.owner;
    delete update.level;
    delete update.date;

    const option  =  {
        new: true,
        upsert: false,
        strict: true
    }

    const member = yield Member.findOneAndUpdate(query, update, option);

    res.send(member);
}

module.exports = router.put('/:id', update);
