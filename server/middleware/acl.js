const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.resolve(__dirname + './../api/'));
const modelMap = {}
files.forEach(modelName => {
    modelMap[`${modelName}s`] = require(`../api/${modelName}/model`);
});

const ACTIONS = { get: 'READ', post: 'CREATE', put: 'UPDATE', delete: 'DELETE' }
const ROLES = { $everyone: 0, $authenticated: 1, teamMember: 2, $owner: 3 }

const EVERYONE = 0;
const AUTHENTICATED = 1;
const TEAMMEMBER = 2;
const OWNER = 3;

const USER = 0;
const MODO = 1;
const ADMIN = 2;


module.exports = function* (req, res) {
    const urlData = req.originalUrl.split('/');
    const action = ACTIONS[req.method.toLowerCase()];
    const modelName = urlData[2];
    const modelId = urlData[3];
    const Model = modelMap[modelName];
    const ACL = Model.ACL;
    const role = ROLES[ACL[action]];

    if (role > EVERYONE) {
        if (!req.session || !req.session.memberId) {
            var err = new Error('You must be logged in to view this page.');
            err.status = 401;
            throw err;
        }
    }

    if (role > AUTHENTICATED && req.session.memberLevel !== ADMIN) {

        const instance = yield Model.findOne({ _id: modelId });
        
        if (!instance) {
            var err = new Error('This document does not exist');
            err.status = 404;
            throw err;
        }

        if (role === OWNER && instance.owner !== req.session.memberId) {
            var err = new Error('Unauthorized operation');
            err.status = 403;
            throw err;
        }

        if (role === TEAMMEMBER && instance.team.indexOf(req.session.memberId) === -1) {
            var err = new Error('Unauthorized operation');
            err.status = 403;
            throw err;
        }
    }
}