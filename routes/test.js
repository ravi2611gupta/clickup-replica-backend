// require('dotenv').config();
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    res.send({hello: "This is ravi"});
})

module.exports = router;
