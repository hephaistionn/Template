const router = require('express').Router();
const Member = require('../model');

function* getById(req, res) {
    const fields = { password: 0, date: 0, __v: 0, level: 0,
         owner: 0, verified:0, token:0, tokendate: 0, try:0  };

    if (req.params.id) {
        if (req.params.id.length < 3) return;
        const query = {_id: req.params.id};
        const member = yield Member.findOne(query, fields);
        res.send(member);
    } else {
            const skills = req.query.skills;
            const online = req.query.online;
            const working = req.query.working;
            const expMin = req.query.expMin;
            const expMax = req.query.expMax;
            console.log('-------------------')
            console.log('skills :', skills);
            console.log('online :', online);
            console.log('working :', working);
            console.log('expMin :', expMin);
            console.log('expMax :', expMax);
        const members = yield Member.find({}, fields);
        res.send(members);
    }

}

module.exports = router.get('/:id*?', getById);
