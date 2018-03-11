const router = require('express').Router();
const Article = require('../model');

function* get(req, res) {
    const populate = { path: 'owner', select: 'username avatar'}

    if (req.params.id) {
        const condition = { _id: req.params.id };
        const artile = yield Article.findOne(condition).populate(populate);
        res.send(artile);
    } else {
        const artiles = yield Article.find().populate(populate);
        res.send(artiles);
    }

}

module.exports = router.get('/:id*?', get);
