const router = require('express').Router();
const Member = require('../model');

function* getById(req, res) {
    const fields = {
        password: 0, date: 0, __v: 0, level: 0,
        owner: 0, verified: 0, token: 0, tokendate: 0, try: 0
    };

    if (req.params.id) {
        if (req.params.id.length < 3) return;
        const query = { _id: req.params.id };
        const member = yield Member.findOne(query, fields);
        res.send(member);
    } else {
        const qey = req.query;
        const condition = {}
        qey.skills ? condition.skills = { $all: qey.skills } : null;
        qey.online ? condition.online = qey.online : null;
        qey.working ? condition.working = qey.working : null;
        if (qey.expMin || qey.expMax) {
            condition.experience = {};
            qey.expMin ? condition.experience.$gt = parseInt(qey.expMin, 10) - 1 : null;
            qey.expMax ? condition.experience.$lt = parseInt(qey.expMax, 10) + 1 : null;
        }
        if (qey.distance) {
            const distance = Math.min(parseInt(qey.distance, 10), 4000);
            const coords = [qey.coords[0], qey.coords[1]];
            condition.loc = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coords
                    },
                    $maxDistance: distance * 1000
                }
            };
        }
        const members = yield Member.find(condition, fields);
        res.send(members);
    }

}

module.exports = router.get('/:id*?', getById);
