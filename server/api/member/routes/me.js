const router = require('express').Router();
const Member = require('../model');


function* getMe(req, res) {

    const condition = {
        _id: req.session.memberId
    }

    const option = { password: 0, date: 0, __v: 0, level: 0, owner: 0 }

    const member = yield Member.findOne(condition, option);

    res.send(member);
}

module.exports = router.get('/me', getMe);
