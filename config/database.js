require('dotenv').config()
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URI;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully.");
    });
}

module.exports = connectToMongo;