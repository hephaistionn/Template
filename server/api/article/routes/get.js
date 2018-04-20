const router = require('express').Router();
const Article = require('../model');

function* get(req, res) {
    const qey = req.query;
    const populate = { path: 'owner', select: 'username avatar'}

    if (req.params.id) {
        const condition = { _id: req.params.id };
        const artile = yield Article.findOne(condition).populate(populate);
        res.send(artile);
    } else {
        const perpage = 10;
        const page = parseInt(qey.page, 10);
        const count = yield Article.count();
        const articles = yield Article.find()
        .skip((page || 1) * perpage - perpage)
        .limit(perpage)
        .populate(populate);
        res.send({
            currentPage: page,
            totalPages: Math.ceil(count/perpage),
            total: count,
            limit: perpage,
            docs: articles
        });
    }

}

module.exports = router.get('/:id*?', get);
