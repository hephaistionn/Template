const router = require('express').Router();
const Comment = require('../model');

function* get(req, res) {

    const fields = { __v: 0 };

    const condition = { articleId: req.params.articleId };

    const populate = { path: 'owner', select: 'username avatar'}

    const comments = yield Comment.find(condition, fields).populate(populate);

    res.send({ list: comments });
}

module.exports = router.get('/article/:articleId', get);
