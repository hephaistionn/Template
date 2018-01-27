module.exports = function (err, req, res, next) {
    const message = err.message || 'Something broke!'; 
    const status = err.status || 500;
    const stack = err.stack;
    res.status(status).send(message);
}