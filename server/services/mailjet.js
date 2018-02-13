const conf = require('../conf'); 
const ejs = require('ejs');
const path  = require('path');

const mailjet = require ('node-mailjet')
    .connect(conf.EMAIL_KEY, conf.EMAIL_SECRET, {
        url: 'api.mailjet.com',
        version: 'v3.1'
      });

const post = mailjet.post("send", {'version': 'v3.1'});

function renderFileAsync(path, params, conf) {
    return function(callback) {
        ejs.renderFile(path, params, conf, callback);
    }
}

module.exports = function * send(params) {

    params.appName = conf.APP_NAME;

    const templatePath = path.resolve(__dirname, params.template);
    const htmlstring = yield renderFileAsync(templatePath, params, {});

    const mailParams = {
        Messages: [
            {
                From: {
                    Email: `noreply@${conf.APP_NAME}.com`,
                    Name: conf.APP_NAME
                },
                To: [{
                    Email: params.email,
                    Name: params.username
                }],
                Subject: params.subject,
                HTMLPart: htmlstring
            }
        ]
    }

    return post.request(mailParams);
}
