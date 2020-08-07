const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    image: {
        type: Buffer
    },
    imageName: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean
    }
});

module.exports = mongoose.model('user', UserSchema);