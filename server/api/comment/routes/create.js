const router = require('express').Router();
const Comment = require('../model');
const Member = require('../../member/model');

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
        owner: req.session.memberId,
        articleId: articleId
    });

    const comment = yield intance.save();

    const fields = {username:1, avatar:1};
    const query = {_id: req.session.memberId};
    comment.owner = yield Member.findOne(query, fields);

    res.send(comment);

}

module.exports = router.post('/article/:articleId', create);