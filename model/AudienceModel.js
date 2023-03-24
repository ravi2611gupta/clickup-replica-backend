const mongoose = require('mongoose');
const { Schema } = mongoose;

const audience = new Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    guests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guest',
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    }]
    
}, {timestamps: true});

module.exports = mongoose.model('audience', audience);