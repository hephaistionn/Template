const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

Comment.ACL = {
    READ: '$authenticated',
    UPDATE: '$owner',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Comment;
