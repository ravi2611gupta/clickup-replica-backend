const mongoose = require('mongoose');
const {Schema} = mongoose;

const admin = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin_flag:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('admin', admin);