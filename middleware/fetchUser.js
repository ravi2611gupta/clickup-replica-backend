require ('dotenv').config();
const JWT_SECRET = process.env.USER_SECRET;
var jwt = require("jsonwebtoken");
const CONSTANTS = require('../Constants');

const fetchUser = (req, resp, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return resp.status(401).send({success:false, error: CONSTANTS.USER.INVALID_AUTHENTICATION });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    // console.log({user:data.user});
    next();
  } catch (error) {
    return resp.status(401).send({success:false, error: CONSTANTS.USER.INVALID_AUTHENTICATION });
  }
};

module.exports = fetchUser;
