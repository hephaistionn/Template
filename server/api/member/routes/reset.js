const router = require('express').Router();
const Member = require('../model');

function* reset(req, res) {
    if (req.body.token) {
        const fields = { date: 0, __v: 0, level: 0, owner: 0, password:0 };
        const option = { sort: { 'tokendate' : -1 } };
        const query = { token: req.body.token };

        const member = yield Member.findOne({ token: req.body.token }, fields, option);

        if (!member) {
            const err = new Error('Bad token');
            err.status = 401;
            throw err;
        }

        member.password = req.body.password,     
        member.token = undefined;
        member.tokendate = undefined;
        yield member.save();
        
        res.send('success');
    } else {
        const err = new Error('params required');
        err.status = 401;
        return err;
    }

}

module.exports = router.post('/reset', reset);