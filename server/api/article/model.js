const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Member' },
    content: String,
    banner: String,
    date: { type: Date, default: Date.now }
},{
    versionKey: false
});

const Article = mongoose.model('Article', ArticleSchema);

Article.ACL = {
    READ: '$everyone',
    UPDATE: '$owner',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Article;
