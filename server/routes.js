const express = require('express');
const router = express.Router();
const path = require('path');
const index = path.resolve(__dirname, './templates/index.ejs');

router.use('/assets', express.static('client/assets'));
router.get('/reset/', indexRender);
router.get('/profile', indexRender);
router.get('/signup', indexRender);
router.get('/signin', indexRender);
router.get('/', indexRender);

function indexRender(req, res) {
    const ext = req.headers.host.substr(-3);
    if (ext === 'com') {
        res.render(index, { lang: 'en' });
    } else {
        res.render(index, { lang: 'fr' });
    }
}

module.exports = router;