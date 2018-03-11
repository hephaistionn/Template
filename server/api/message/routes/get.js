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

    const fields = { team: 0, _id: 0 };
    const query = { team: { '$all': [currenMemberId, memberId] } };

    const list = yield Message.find(query, fields);
    const team = yield populate(memberId);
    const room = [currenMemberId, memberId].sort().join('');

    const result = {
        list: list,
        team: team,
        room: room
    }

    res.send(result);
}

function* populate(memberId) {
    const fields = { username: 1, avatar: 1 };
    const query = { _id: memberId };

    const member = yield Member.findOne(query, fields);

    return [member];
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
        const query = { _id: group._id.filter(id => id !== currenMemberId)[0] };
        conversations.push({
            member: yield Member.findOne(query, fields),
            date: group.lastmessage.date,
            lastMessage: group.lastmessage.content
        });
    }

    res.send(conversations);
}

router.get('/team/:memberId', getTeam);
router.get('/', getAll);

module.exports = router;
