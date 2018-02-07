const router = require('express').Router();
const Article = require('../model');
const sendmail = require('../../../services/mailjet');

function* mailtest(req, res) {
    const emailData = {
        Messages: [
            {
                From: {
                    Email: "verify@ublocs.com",
                    Name: "Templatemail"
                },
                To:  [{
                    Email: "wipviewalex2@yopmail.com",
                    Name: "User"
                }],
                Subject: "Your email flight plan!",
                TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                HTMLPart: "<h3>Dear passenger 1, welcome to Mailjet!</h3><br />May the delivery force be with you!"
            }
        ]
    }
    yield sendmail.request(emailData)
    res.send('success');
  
}

module.exports = router.post('/mailtest', mailtest);
