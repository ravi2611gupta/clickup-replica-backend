require('dotenv').config()
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URI;


const connectToMongo = async () => {
    try {
       await mongoose.connect(mongoURI);
       console.log("database connected successfully!",);
    } catch (error) {
        console.log("can not connect to the database.", error);
    }
}

module.exports = connectToMongo;