const router = require('express').Router();
const Member = require('../model');

function* verify(req, res) {
    if (req.body.token) {
        const fields = { date: 0, __v: 0, level: 0, owner: 0, password:0 };
        const option = { sort: { 'tokendate' : -1 } };
        const query = { token: req.body.token };

        const member = yield Member.findOne(query, fields, option);

        if (!member) {
            const err = new Error('Bad token');
            err.status = 401;
            throw err;
        }

        member.token = undefined;
        member.tokendate = undefined;
        member.verified = true;
        yield member.save();

        req.session.memberId = member._id;
        req.session.memberLevel = member.level;

        res.send(member);

    } else {
        const err = new Error('params required');
        err.status = 401;
        return err;
    }

}

module.exports = router.post('/verify', verify);