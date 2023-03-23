const mongoose = require('mongoose');
const { Schema } = mongoose;

const tag = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    tag_created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tag', tag)