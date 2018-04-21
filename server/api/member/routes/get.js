const router = require('express').Router();
const Member = require('../model');

function* getById(req, res) {
    const fields = {
        password: 0, date: 0, __v: 0, level: 0,
        owner: 0, verified: 0, token: 0, tokendate: 0, try: 0
    };

    if (req.params.id) {
        const qey = req.query;
        if (req.params.id.length < 3) return;
        const query = { _id: req.params.id };
        const member = yield Member.findOne(query, fields)
        res.send(member);
    } else {
        const qey = req.query;
        const perpage = 100;
        const page = parseInt(qey.page||1, 10);
        const count = yield Member.count();
        const condition = {}
        if(qey.skills) {
            condition.skills = { $all: qey.skills };
        }
        if(qey.online) {
            condition.online = qey.online;
        }
        if(qey.working) {
            condition.working = qey.working;
        }
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
        const members = yield Member.find(condition, fields)
        .skip((page || 1) * perpage - perpage)
        .limit(perpage);
        res.send({
            currentPage: page,
            totalPages: Math.ceil(count/perpage),
            total: count,
            limit: perpage,
            docs: members
        });
    }

}

module.exports = router.get('/:id*?', getById);
