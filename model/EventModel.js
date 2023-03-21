const mongoose = require('mongoose');
const { Schema } = mongoose;

const event = new Schema({
    name: {
        type: String,
        required: true,
    },
    cover_image: {
        type: String,
        required: true,
    },
    event_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'eventtypes',
        required:true
    },
    event_host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    event_access_approval: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

module.exports = mongoose.model('event', event);