const mongoose = require('mongoose');
const { Schema } = mongoose;

const inperson = new Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        require: true
    },
    event_location: {
        type: String,
        require: true
    },
}, {timestamps: true})

module.exports = mongoose.model('inperson', inperson);