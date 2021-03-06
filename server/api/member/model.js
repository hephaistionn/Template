
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String 
    },
    skills: {
        type: Array
    },
    experience: Number,
    working: Boolean,
    verified: Boolean,
    token: String,
    tokendate: Date,
    try: {
        type: Number,
        default: 0
    },
    owner: String,
    level: {
        type: Number
    },
    city: String,
    loc: {
        type: [Number],
        index: '2d'
    },
    avatar: String,
    date: { type: Date, default: Date.now }
});

MemberSchema.pre('save', function (next) {
    const member = this;
    if (!member.isModified('password')) return next();

    bcrypt.hash(member.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        member.password = hash;
        next();
    })
});

const Member = mongoose.model('Member', MemberSchema);

Member.ACL = {
    READ: '$authenticated',
    UPDATE: '$owner',
    CREATE: '$everyone',
    DELETE: '$owner'
};

module.exports = Member;
