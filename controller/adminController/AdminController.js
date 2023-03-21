require("dotenv").config();
const { validationResult } = require("express-validator");
const AdminModel = require("../../model/AdminModel");
const CONSTANTS = require("../../Constants");

// password protection
var bcrypt = require("bcryptjs");

// Json Web Token Authentication step : 1
const JWT_SECRET = process.env.ADMIN_SECRET;
var jwt = require("jsonwebtoken");

// ! registration --> auth-token not required
exports.register = async (req, resp) => {
  let success = false;
 
  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(CONSTANTS.ERROR.ERROR_CODE).json({ success, error: errors.array() });
  }

  // Check whether the email exist already
  try {
    let admin = await AdminModel.findOne({ email: req.body.email });
    if (admin && admin.admin_flag===true) {
      return resp.status(CONSTANTS.ERROR.ERROR_CODE).json({
        success,
        error: CONSTANTS.AUTH.EMAIL_ALREADY_EXIST,
      });
    }

    // password salting
    const salt = await bcrypt.genSalt(10);
    var secPass = await bcrypt.hash(req.body.password, salt);

    // create a new admin
    admin = await AdminModel.create({
      email: req.body.email,
      password: secPass,
    });

    // Json Web Token Authentication step : 2 start
    const jwtData = {
      admin: {
        id: admin._id,
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


// !login --> auth-token not required
exports.login =  async (req, resp) => {

  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(CONSTANTS.ERROR.ERROR_CODE).json({ errors: errors.array() });
  }

  let success=false;

  const { email, password } = req.body;
  try {
    let admin = await AdminModel.findOne({ email });
    if (!admin) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .json({success, error: CONSTANTS.AUTH.EMAIL_NOT_FOUND });
    }

    if (admin.admin_flag===false) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .json({success, error: CONSTANTS.AUTH.EMAIL_NOT_FOUND });
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);

    if (!passwordCompare) {
      return resp
        .status(CONSTANTS.ERROR.ERROR_CODE)
        .json({success, error: CONSTANTS.AUTH.EMAIL_PASSWORD_MISMATCH });
    }

    const payload = {
      admin: {
        id: admin._id,
      },
    };

    const authToken = jwt.sign(payload, JWT_SECRET);
    success=true;
    resp.json({success, authToken });
  } catch (error) {
    // console.error(error);
    resp.status(CONSTANTS.ERROR.SERVER_ERROR_CODE).send({success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
}