// const connectToMongo = require("./config/database");
// connectToMongo();
const express = require("express");
const app = express();
const port = 5000
app.use(express.json());

// Available Routes
app.use('/api/test', require('./routes/test'));

app.listen(port, ()=>{
    console.log(`LMS backend listening at http://localhost:${port}`);
});