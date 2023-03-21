const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventType = new Schema({
    name: {
        type: String,
        required: true,
    },
    event_type_flag:{
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('eventType', eventType);