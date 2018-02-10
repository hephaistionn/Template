const router = require('express').Router();
const Member = require('../model');


function* getMe(req, res) {

    const fields = { password: 0, date: 0, __v: 0, level: 0, owner: 0, verified:0, token: 0, tokendate: 0  };
    const query = {_id: req.session.memberId}

    const member = yield Member.findOne(query, fields);

    res.send(member);
}

module.exports = router.get('/me', getMe);
