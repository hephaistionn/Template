const router = require('express').Router();
const Member = require('../model');
const sendmail = require('../../../services/mailjet');
const mongoose = require('mongoose');
const conf = require('../../../conf');

function* signup(req, res) {
    if (req.body.email && req.body.username && req.body.password) {
        const intance = new Member({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            token: mongoose.Types.ObjectId().toString().substr(-5),
            tokendate: new Date(),
            verified: false,
            level: 0
        });
        intance.owner = intance._id;

        const emailData = {
            Messages: [
                {
                    From: {
                        Email: `noreply@${conf.APP_NAME}.com`,
                        Name: conf.APP_NAME
                    },
                    To: [{
                        Email: req.body.email,
                        Name: req.body.username
                    }],
                    Subject: "Signed up successfully",
                    TextPart: `Welcome to ${conf.APP_NAME}.\n Hey ${intance.username},\n Thanks for registering, 
                    Use this code to validate your account.\n ${intance.token}`,
                    HTMLPart: `<h1>Welcome to ${conf.APP_NAME}</h1><p>Hey ${intance.username},</p><p>Thanks for registering, 
                    Use this code to validate your account.</p> <h2>${intance.token}</h2> `
                }
            ]
        }
        yield sendmail.request(emailData);

        yield intance.save();

        res.send('success');

    } else {
        const err = new Error('params required');
        err.status = 400;
        return err;
    }

}

module.exports = router.post('/signup', signup);