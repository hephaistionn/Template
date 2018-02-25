const router = require('express').Router();
const Message = require('../model');

function* create(req, res) {

    const memberId = req.params.memberId;
    const ownerId = req.session.memberId;
    const content = req.body.content;

    if (!memberId) {
        const err = new Error('Need target');
        err.status = 403;
        throw err;
    }
    if (!req.body.content) {
        const err = new Error('Need content');
        err.status = 403;
        throw err;
    }

    const intance = new Message({
        content: content,
        owner: ownerId,
        team: [ownerId, memberId].sort()
    });

    const message = yield intance.save();

    res.send({
        content: message.content,
        owner: ownerId,
        date: message.date
    });

}

module.exports = router.post('/team/:memberId', create);