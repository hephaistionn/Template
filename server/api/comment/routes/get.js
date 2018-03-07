const router = require('express').Router();
const Comment = require('../model');

function* get(req, res) {

    const condition = { articleId: req.params.articleId };

    const comments = yield Comment.find(condition);

    res.send({ list: comments });
}

module.exports = router.get('/article/:articleId', get);
