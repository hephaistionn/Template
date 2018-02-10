const router = require('express').Router();
const Member = require('../model');
const bcrypt = require('bcrypt');

function* login(req, res) {

    const fields = { date: 0, __v: 0, level: 0, owner: 0, token:0, tokendate:0 };

    const member = yield Member.findOne({ email: req.body.email }, fields);

    if (!member) {
        const err = new Error('Invalid email');
        err.status = 400;
        throw err;
    }

    if (!member.verified) {
        const err = new Error('Unconfirmed email');
        err.status = 428;
        throw err;
    }

    if(member.try > 2) {
        const err = new Error('Too many attempts');
        err.status = 401;
        throw err;
    }

    const same = yield bcrypt.compare(req.body.password, member.password);
    if (!same) {
        member.try++;
        yield member.save();

        const err = new Error('Invalid password');
        err.status = 400;
        throw err;
    }

    req.session.memberId = member._id;
    req.session.memberLevel = member.level;

    member.try = 0;
    member.token = undefined;
    yield member.save();

    res.json(member);
}


module.exports = router.post('/login', login);
