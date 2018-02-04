const router = require('express').Router();
const Member = require('../model');
const bcrypt = require('bcrypt');

function* login(req, res) {

    const option = { date: 0, __v: 0, level: 0, owner: 0 };

    const member = yield Member.findOne({ email: req.body.email }, option);
    if (!member) {
        const err = new Error('Invalid email');
        err.status = 401;
        throw err;
    }

    const same = yield bcrypt.compare(req.body.password, member.password);
    if (!same) {
        const err = new Error('Invalid password');
        err.status = 401;
        throw err;
    }

    req.session.memberId = member._id;
    req.session.memberLevel = member.level;

    res.json(member);
}


module.exports = router.post('/login', login);
