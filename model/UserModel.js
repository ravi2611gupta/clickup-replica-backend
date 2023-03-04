const mongoose = require('mongoose');
const {Schema} = mongoose;

const user = new Schema({
    name:{
        type:String,
        required:true,
    },
profile:{
        type:String,
    },
    mobile:{
        type:Number,
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
    address:{
        type: String,
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
        type: Date,
        default: Date.now,
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('user', user);