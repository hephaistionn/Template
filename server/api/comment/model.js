const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Member' },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    deleted: Boolean,
    date: { type: Date, default: Date.now }
},{
    versionKey: false
});

const Comment = mongoose.model('Comment', CommentSchema);

Comment.ACL = {
    READ: '$authenticated',
    UPDATE: '$owner',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Comment;
