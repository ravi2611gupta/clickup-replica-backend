const mongoose = require('mongoose');
const { Schema } = mongoose;

const zoom = new Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        require: true
    },
    zoom_meeting_url: {
        type: String,
        require: true
    },
    zoom_meeting_id: {
        type: String,
        require: true
    },
    zoom_meeting_password: {
        type: String,
        require: true
    },
}, {timestamps: true})

module.exports = mongoose.model('zoom', zoom);