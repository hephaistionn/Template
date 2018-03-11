const router = require('express').Router();
const Comment = require('../model');

function* remove(req, res) {
    const condition = { _id: req.params.id };

    const updated = { deleted: true };

    const option = {
        new: true,
        upsert: false,
        strict: true
    }

    const comment = yield Comment.findOneAndUpdate(condition, updated, option);

    res.send('deleted');
}

module.exports = router.delete('/:id', remove);
