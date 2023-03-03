const connectToMongo = require("./config/database");
connectToMongo();

const express = require("express");
const app = express();
const port = 5000
app.use(express.json());

// Available Routes
app.get("/", (req, resp)=>{
    resp.json("test is working")
})

// getting routes
const userRoutes = require("./routes/users");



app.use("/user", userRoutes);

app.listen(port, ()=>{
    console.log(`LMS backend listening at http://localhost:${port}`);
});