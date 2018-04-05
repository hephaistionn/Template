const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Member' },
    team: Array,
    room: String, 
    date: { type: Date, default: Date.now }
},{
    versionKey: false
});

const Message = mongoose.model('Message', MessageSchema);

Message.ACL = {
    READ: '$authenticated',//'$teamMember',
    UPDATE: '$teamMember',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Message;
