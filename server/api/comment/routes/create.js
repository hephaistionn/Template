const router = require('express').Router();
const Comment = require('../model');

function* create(req, res) {

    const articleId = req.params.articleId;
    const ownerId = req.session.memberId;
    const content = req.body.content;

    if (!articleId) {
        const err = new Error('Need article');
        err.status = 403;
        throw err;
    }
    if (!content) {
        const err = new Error('Need content');
        err.status = 403;
        throw err;
    }

    const intance = new Comment({
        content: content,
        owner: ownerId,
        articleId: articleId
    });

    const comment = yield intance.save();

    res.send(comment);

}

module.exports = router.post('/article/:articleId', create);