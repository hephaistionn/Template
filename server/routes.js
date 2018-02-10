const express = require('express');
const router = express.Router();
const path = require('path');
const index = path.resolve(__dirname, './templates/index.ejs');

router.use('/', express.static('client/.dist'));

router.get('/members/:memberId/edit', indexRender);
router.get('/members/:memberId', indexRender);
router.get('/members', indexRender);
router.get('/signup', indexRender);
router.get('/signin', indexRender);
router.get('/verify/', indexRender);
router.get('/verify/request', indexRender);
router.get('/reset/', indexRender);
router.get('/reset/request', indexRender);
router.get('/messages/:memberId1/:memberId2', indexRender);
router.get('/messages', indexRender);
router.get('/articles', indexRender);
router.get('/articles/edit', indexRender);
router.get('/articles/:articleId/edit', indexRender);
router.get('/articles/:articleId', indexRender);
router.get('/articles/', indexRender);
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