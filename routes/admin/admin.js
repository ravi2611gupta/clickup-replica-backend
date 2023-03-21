const express = require("express");
const router = express.Router();
const AdminController = require("../../controller/adminController/AdminController");
const { body } = require("express-validator");

// middleware
const fetchAdmin = require("../../middleware/fetchAdmin");
const CONSTANTS = require("../../Constants");

router.post(
  "/register",
  [
    body("email", CONSTANTS.FIELD_VALIDATION.EMAIL_VALIDATION).isEmail(),
    body("password", CONSTANTS.FIELD_VALIDATION.PASSWORD_VALIDATION).isLength({
      min: 8,
    }),
  ],
  AdminController.register
);

router.post(
  "/login",
  [
    body("email", CONSTANTS.FIELD_VALIDATION.EMAIL_VALIDATION).isEmail(),
    body("password", CONSTANTS.FIELD_VALIDATION.PASSWORD_VALIDATION).isLength({
      min: 8,
    }),
  ],
  AdminController.login
);

module.exports = router;
