const conf = require('../conf'); 

const mailjet = require ('node-mailjet')
    .connect(conf.EMAIL_KEY, conf.EMAIL_SECRET, {
        url: 'api.mailjet.com',
        version: 'v3.1'
      });

module.exports = mailjet;