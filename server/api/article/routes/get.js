const router = require('express').Router();
const Article = require('../model');

function* get(req, res) {
    
    if(req.params.id){
        const condition = { _id: req.params.id };
        const artile = yield Article.findOne(condition);
        res.send(artile);
    } else{
        const artiles = yield Article.find();
        res.send(artiles);
    }

}

module.exports = router.get('/:id*?', get);
