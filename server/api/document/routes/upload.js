const router = require('express').Router();
const Document = require('../model');
const Member = require('../../member/model');
const Article = require('../../article/model');
const cloudinary = require('../../../services/cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const folder = 'wiproom';
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: folder,
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(undefined);
    }
});

const parser = multer({ storage: storage });

function* upload(req, res) {

    const memberId = req.session.memberId;

    let document = yield Document.findOne({ owner: memberId });
    if (!document) document = new Document({ owner: memberId });

    // for each upload unused files are removed
    yield removeUselessFiles(document, memberId);

    // save used urls for this user
    document.files.push(req.files[0].secure_url);
    yield document.save();

    res.send(req.files[0].secure_url);

}

function* removeUselessFiles(document, memberId) {
    const articles = yield Article.find({ owner: memberId });
    const member = yield Member.findOne({ owner: memberId });

    // get all used urls by the current member
    const urlsUsed = [];
    member.avatar ? urlsUsed.push(member.avatar) : null;
    articles.forEach(article => {
        article.banner ? urlsUsed.push(article.banner) : null;
    });

    // get all unused urls by the current member
    const userless = [];
    document.files.map(file => {
        if (urlsUsed.indexOf(file) === -1) {
            userless.push(file);
        }
    });

    // remove unused urls
    for (let i = 0; i < userless.length; i++) {
        const mustBeRemoved = userless[i];
        const index = document.files.indexOf(mustBeRemoved);
        document.files.splice(index, 1);
        const public_id = folder + '/' + mustBeRemoved.split('/').pop().split('.')[0];
        yield cloudinary.api.delete_resources(public_id);
    }
}

module.exports = router.post('/:id', parser.array('image', 1), upload);
