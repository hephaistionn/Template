const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

Message.ACL = {
    READ: '$teamMember',
    UPDATE: '$owner',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Message;
