const router = require('express').Router();
const Message = require('../model');
const Member = require('../../member/model');

function* getTeam(req, res) {
    const memberId = req.params.memberId;
    const currenMemberId = req.session.memberId;

    if (!memberId) {
        const err = new Error('Need memberId');
        err.status = 428;
        throw err;
    }

    const fields = { __v: 0, owner: 0, team: 0, _id: 0 };
    const query = { team: { '$all': [currenMemberId, memberId] } };

    let messages = yield Message.find(query, fields);

    messages = yield populate(messages, memberId);

    res.send(messages);
}

function* populate(messages, memberId) {
    const fields = { username: 1, avatar: 1 };
    const query = { _id: memberId };

    const member = yield Member.findOne(query, fields);

    messages[0].team = [member];

    return messages;
}


function* getAll(req, res) {
    const currenMemberId = req.session.memberId;

    const pipeline = [
        { $match: { team: { '$all': [currenMemberId] } } },
        { $group: { _id: "$team", lastmessage: { $last: "$$ROOT" } } },
    ]

    let messagesGrouped = yield Message.aggregate(pipeline);

    const conversations = [];
    const fields = { username: 1, avatar: 1 };
    for (let i = 0; i < messagesGrouped.length; i++) {
        const group = messagesGrouped[i];
        const query = { _id: group._id[1] };
        conversations.push({
            member: yield Member.findOne(query, fields),
            lastMessage: group.lastmessage.content
        });
    }

    res.send(conversations);
}

router.get('/team/:memberId', getTeam);
router.get('/', getAll);

module.exports = router;
