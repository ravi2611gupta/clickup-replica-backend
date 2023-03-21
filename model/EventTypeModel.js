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
    }
}, { timestamps: true })

module.exports = mongoose.model('eventType', eventType);