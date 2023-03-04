const express = require("express");
const router = express.Router();
const UserController = require('../controller/UserController');
const { body } = require("express-validator")

// middleware
const fetchUser = require('../middleware/fetchUser');
const CONSTANTS = require("../Constants");

router.post("/register",
[
    body("name", CONSTANTS.USER.NAME_VALIDATION).isLength({ min: 2 }),
    body("password", CONSTANTS.USER.PASSWORD_VALIDATION).isLength({ min: 8 }),
    body("email", CONSTANTS.USER.EMAIL_VALIDATION).isEmail(),
  ],
 UserController.register);

 router.post("/login",
[
    body("password", CONSTANTS.USER.PASSWORD_VALIDATION).isLength({ min: 8 }),
    body("email", CONSTANTS.USER.EMAIL_VALIDATION).isEmail(),
  ],
 UserController.login);



module.exports = router;
