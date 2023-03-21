require ('dotenv').config();
const JWT_SECRET = process.env.ADMIN_SECRET;
var jwt = require("jsonwebtoken");
const CONSTANTS = require('../Constants');

const fetchAdmin = (req, resp, next) => {
  // Get the admin from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return resp.status(401).send({success:false, error: CONSTANTS.AUTH.INVALID_AUTHENTICATION });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.admin = data.admin;
    // console.log({admin:data.admin});
    next();
  } catch (error) {
    return resp.status(401).send({success:false, error: CONSTANTS.AUTH.INVALID_AUTHENTICATION });
  }
};

module.exports = fetchAdmin;
