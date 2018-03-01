const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: String,
    owner: String,
    team: Array,
    room: String, 
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

Message.ACL = {
    READ: '$authenticated',//'$teamMember',
    UPDATE: '$teamMember',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Message;
