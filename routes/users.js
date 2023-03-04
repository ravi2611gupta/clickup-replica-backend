const express = require("express");
const router = express.Router();
const UserController = require('../controller/UserController');

// middleware
const fetchUser = require('../middleware/fetchUser')

router.post("/register", UserController.register);

module.exports = router;
