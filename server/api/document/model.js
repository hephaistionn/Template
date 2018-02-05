const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    files: {
        type: Array,
        default: []
    },
    owner: String
});

const Document = mongoose.model('Document', DocumentSchema);

Document.ACL = {
    READ: '$authenticated',
    UPDATE: '$authenticated',
    CREATE: '$authenticated',
    DELETE: '$owner'
};

module.exports = Document;
