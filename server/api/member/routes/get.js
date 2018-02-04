const router = require('express').Router();
const Member = require('../model');

function* getById(req, res) {

    const option = { password: 0, date: 0, __v: 0, level: 0, owner: 0 }

    if (req.params.id) {
        if (req.params.id.length < 3) return;
        const condition = {
            _id: req.params.id
        };
        const member = yield Member.findOne(condition, option);
        res.send(member);
    } else {
        const members = yield Member.find({}, option);
        res.send(members);
    }

}

module.exports = router.get('/:id*?', getById);
