const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    choices: Array,
    votes: Array,
    date: { type: Date, default: Date.now }
});

const Poll = mongoose.model('Poll', PollSchema);

Poll.ACL = {
    READ: '$authenticated',
    UPDATE: '$authenticated',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Poll;
