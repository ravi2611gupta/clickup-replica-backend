const express = require("express");
const router = express.Router();
const UserController = require("../../controller/userController/UserController");
const { body } = require("express-validator");

// middleware
const fetchUser = require("../../middleware/fetchUser");
const CONSTANTS = require("../../Constants");

router.post(
  "/register",
  [ 
    body("name", CONSTANTS.FIELD_VALIDATION.NAME_VALIDATION).isLength({ min: 2, }),
    body("password", CONSTANTS.FIELD_VALIDATION.PASSWORD_VALIDATION).isLength({ min: 8, }),
    body("email", CONSTANTS.FIELD_VALIDATION.EMAIL_VALIDATION).isEmail(),
  ],
  UserController.register
);

router.post(
  "/login",
  [
    body("password", CONSTANTS.FIELD_VALIDATION.PASSWORD_VALIDATION).isLength({ min: 8, }),
    body("email", CONSTANTS.FIELD_VALIDATION.EMAIL_VALIDATION).isEmail(),
  ],
  UserController.login
);

module.exports = router;
