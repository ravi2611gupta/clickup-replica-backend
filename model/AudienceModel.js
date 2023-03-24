const mongoose = require('mongoose');
const { Schema } = mongoose;

const audience = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    }]
    
}, {timestamps: true});

module.exports = mongoose.model('audience', audience);