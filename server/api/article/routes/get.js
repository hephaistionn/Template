const router = require('express').Router();
const Article = require('../model');

function* get(req, res) {

    const condition = { _id: req.params.id };

    const artile = yield Article.findOne(condition);

    res.send(artile);
}

module.exports = router.get('/:id*?', get);
