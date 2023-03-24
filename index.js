require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');

// connection
const connectToMongo = require("./config/database");
connectToMongo();

// middleware
app.use(express.json());
app.use(cors());

// constants
const port = process.env.PORT || 5000;


// Available Routes
app.get("/", (req, resp)=>{
    resp.json("test is working")
})

// getting routes
// testing
const mail = require("./routes/user/mail");

// admin
const adminRoutes = require("./routes/admin/admin");
const eventType = require("./routes/admin/eventType");

// user
const userRoutes = require("./routes/user/users");
const events = require("./routes/user/events");
const guests = require("./routes/user/guest");
const tags = require("./routes/user/tag");
const audience = require("./routes/user/audience");


app.use("/mail", mail);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/event-type", eventType);
app.use("/event", events);
app.use("/guest", guests);
app.use("/tag", tags);
app.use("/audience", audience);


app.listen(port, ()=>{
    console.log(`Click-up replica backend listening at http://localhost:${port}`);
});