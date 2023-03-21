const mongoose = require('mongoose');
const { Schema } = mongoose;

const virtual = new Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        require: true
    },
    event_url: {
        type: String,
        require: true
    },
}, {timestamps: true})

module.exports = mongoose.model('virtual', virtual);