const express = require('express');
const router = express.Router();
const path = require('path');
const index = path.resolve(__dirname, './templates/index.ejs');
const googleapi = require('./services/googleapi');

router.use('/', express.static('client/.dist'));

router.get('/members/:memberId/edit', indexRender);
router.get('/members/:memberId', indexRender);
router.get('/members', indexRender);
router.get('/signup', indexRender);
router.get('/signin', indexRender);
router.get('/verify/confirm', indexRender);
router.get('/verify/request', indexRender);
router.get('/reset/confirm', indexRender);
router.get('/reset/request', indexRender);
router.get('/messages/:memberId', indexRender);
router.get('/messages', indexRender);
router.get('/articles', indexRender);
router.get('/articles/edit', indexRender);
router.get('/articles/:articleId/edit', indexRender);
router.get('/articles/:articleId', indexRender);
router.get('/articles/', indexRender);
router.get('/', indexRender);
router.get('/geo/autocomplete/:input', autocomplete);
router.get('/geo/location/:cityId', location);

function indexRender(req, res) {
    const ext = req.headers.host.substr(-3);
    if (ext === 'com') {
        res.render(index, { lang: 'en' });
    } else {
        res.render(index, { lang: 'fr' });
    }
}

function * autocomplete(req, res) {
    const input = req.params.input;
    const response = yield googleapi.autocomplete(input);
    res.send(response);
}

function * location(req, res) {
    const cityId = req.params.cityId;
    const response = yield googleapi.getLocation(cityId);
    res.send(response);
}

module.exports = router;