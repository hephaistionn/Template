const router = require('express').Router();
const Member = require('../model');

function* logout(req, res) {
    if (req.session) {
        req.session.destroy(err => {
          if(err) {
            const err = new Error('Invalid session');
            err.status = 401;
            throw err;
          } else {
            res.json({logout:true});
          }
        });
    } else {
        const err = new Error('No session');
        err.status = 401;
        throw err;   
    }
    
}

module.exports = router.get('/logout', logout);