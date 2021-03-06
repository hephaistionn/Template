const router = require('express').Router();
const Member = require('../model');
const mongoose = require('mongoose');
const sendmail = require('../../../services/mailjet');

function* resetrequest(req, res) {
    if (req.body.email) {
        const fields = { date: 0, __v: 0, level: 0, owner: 0, password:0 };
        const query = { email: req.body.email };

        const member = yield Member.findOne(query, fields);
        member.token = mongoose.Types.ObjectId().toString().substr(-5);
        member.tokendate =  new Date();

        yield sendmail({
            email: member.email,
            username: member.username,
            token: member.token,
            template: '../templates/reset/en.ejs'
        });

        yield member.save();

        res.send('success');
    } else {
        const err = new Error('params required');
        err.status = 401;
        return err;
    }

}

module.exports = router.post('/resetrequest', resetrequest);