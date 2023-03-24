const mongoose = require('mongoose');
const { Schema } = mongoose;

const event = new Schema({
    event_name: { type: String, required: true },
    event_cover_image: { type: String, required: true },
    event_host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    event_mode: { 
        type: String, 
        required: true, 
        enum: ['zoom', 'virtual', 'in-person'] 
    },
    zoom_link: { 
        type: String, 
        required: function() { return this.event_mode === 'zoom'; } 
    },
    zoom_meeting_id: { 
        type: String, 
        required: function() { return this.event_mode === 'zoom'; } 
    },
    zoom_password: { 
        type: String, 
        required: function() { return this.event_mode === 'zoom'; } 
    },
    meeting_url: { 
        type: String, 
        required: function() { return this.event_mode === 'virtual'; } 
    },
    venue_address: { 
        type: String, 
        required: function() { return this.event_mode === 'in-person'; } 
    },
    event_type: { 
        type: String, 
        required: true, 
        enum: ['single', 'series'] 
    },
    single_event_start_date: {
        type: String, 
        required: function() { return this.event_type === 'single'; } 
    },
    single_event_end_date: {
        type: String, 
        required: function() { return this.event_type === 'single'; } 
    },
    single_event_start_time: {
        type: String, 
        required: function() { return this.event_type === 'single'; } 
    },
    single_event_end_time: {
        type: String, 
        required: function() { return this.event_type === 'single'; } 
    },

    //  todo: fix this
    series_event_start_date: [{
        event_date: { type: String, required: function() { return this.event_type === 'series'; }  },
        event_time: { type: String, required: function() { return this.event_type === 'series'; }  }
      }],

    event_access_approval: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

module.exports = mongoose.model('event', event);