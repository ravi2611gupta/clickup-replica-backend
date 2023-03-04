require("dotenv").config();
const express = require("express");
const { body, validationResult } = require("express-validator");
const UserModel = require("../model/UserModel");
const CONSTANTS = require("../Constants");

// password protection
var bcrypt = require("bcryptjs");

// Json Web Token Authentication step : 1
const JWT_SECRET = process.env.USER_SECRET;
var jwt = require("jsonwebtoken");

exports.register = async (req, resp) => {
  let success = false;
 
  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ success, error: errors.array() });
  }

  // Check whether the email exist already
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user && user.user_flag===true) {
      return resp.status(400).json({
        success,
        error: CONSTANTS.USER.EMAIL_ALREADY_EXIST,
      });
    }

    // password salting
    const salt = await bcrypt.genSalt(10);
    var secPass = await bcrypt.hash(req.body.password, salt);

    // create a new user
    user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    // Json Web Token Authentication step : 2 start
    const jwtData = {
      user: {
        id: user._id,
      },
    };

    const authToken = jwt.sign(jwtData, JWT_SECRET);
    success = true;
    resp.json({ success, authToken });

  } catch (error) {
    // console.log("Error: ", error)
    resp.status(CONSTANTS.ERROR.SERVER_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};
