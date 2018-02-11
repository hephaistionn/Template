module.exports = {
    APP_NAME: 'ublocs',
    NODE_ENV: process.env.NODE_ENV,
    HOST_NAME: process.env.HOST_NAME,
    URI: process.env.URI,
    EMAIL_KEY: process.env.EMAIL_KEY,
    EMAIL_SECRET: process.env.EMAIL_SECRET,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET
};
console.log(module.exports);
