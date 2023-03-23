const mongoose = require('mongoose');
const { Schema } = mongoose;

const guest = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('guest', guest);