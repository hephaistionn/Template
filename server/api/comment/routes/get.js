const router = require('express').Router();
const Comment = require('../model');

function* get(req, res) {

    const fields = { __v: 0 };

    const condition = { articleId: req.params.articleId, deleted: null, commentId: req.params.commentId||null };

    const populate = { path: 'owner', select: 'username avatar' }

    const comments = yield Comment.find(condition, fields).populate(populate);

    const jsonComs = comments.map(com =>com.toJSON());

    for(let i=0; i< jsonComs.length; i++) {
        jsonComs[i].numberReplies = yield countReplies(req.params.articleId, jsonComs[i]._id);
    }

    res.send({ list: jsonComs });
}

function* countReplies (articleId, commentId) {

    if(!commentId) return 0;

    const fields = {_id: 1};

    const condition = { articleId: articleId, commentId: commentId, deleted: null };

    const replies = yield Comment.find(condition, fields);

    return replies.length;
}  

module.exports = router.get('/article/:articleId', get);
module.exports = router.get('/article/:articleId/:commentId', get);