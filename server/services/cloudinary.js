const conf = require('../conf');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "dhaptygxt",
    api_key: conf.CLOUD_KEY,
    api_secret: conf.CLOUD_SECRET
});

module.exports = cloudinary;