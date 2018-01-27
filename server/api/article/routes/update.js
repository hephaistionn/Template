const router = require('express').Router();
const Article = require('../model');
  
function* update(req, res){

    const condition = {_id: req.params.id};

    const updated =  req.body;

    const option  =  {
        new: true,
        upsert: false,
        strict: true
    }

    const article = yield Article.findOneAndUpdate(condition, updated, option);

    res.send(article);
}

module.exports = router.put('/:id', update);
