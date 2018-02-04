const router = require('express').Router();
const Article = require('../model');

function* create(req, res) {

    const model = req.body;
    model.owner = req.session.memberId;

    const intance = new Article(model);

    const article = yield intance.save();

    res.send(article);
}

module.exports = router.post('/', create);