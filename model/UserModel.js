const mongoose = require('mongoose');
const {Schema} = mongoose;

const user = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
profile:{
        type:String,
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    user_flag:{
        type:Boolean,
        default:true
    },
    user_login_time:{
        type:String
    },
    user_logout_time:{
        type:String
    },
    user_updated_time:{
        type: String,
        default: Date.now,
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('user', user);