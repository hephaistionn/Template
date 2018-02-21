const router = require('express').Router();
const Message = require('../model');

function* get(req, res) {
    const memberId = req.params.id2;
    const ownerId = req.session.memberId;

    const fields = { __v: 0, owner: 0, team: 0, _id: 0 };

    const condition = {};
    if (memberId) {
        condition.team = { '$all': [ownerId, memberId] };
    } else if (req.params.id1) {
        condition.team = { '$all': [ownerId] };
    }

    const message = yield Message.find(condition, fields);

    res.send(message);
}

router.get('/team/:memberId', get);

module.exports = router;
