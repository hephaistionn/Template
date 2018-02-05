const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    owner: String,
    content: String,
    banner: String,
    date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', ArticleSchema);

Article.ACL = {
    READ: '$authenticated',
    UPDATE: '$owner',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Article;
