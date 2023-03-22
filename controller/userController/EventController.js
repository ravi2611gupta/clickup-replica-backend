require("dotenv").config();
const { validationResult } = require("express-validator");
const EventModel = require("../../model/EventModel");
const CONSTANTS = require("../../Constants");
const mongoose = require('mongoose')

// ! addEvent --> auth-token required
exports.addEvent = async (req, resp) => {
  let success = false;

  // getting userId
  const userId = req.user.id;
  if (userId == "") {
    return resp.status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }

  if(userId !== req.params.userId){
    return resp.status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }


  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(CONSTANTS.ERROR.ERROR_CODE)
      .json({ success, error: errors.array() });
  }

  try {
    //  destructuring of req.body
    const formData = {...req.body, event_host:userId};

    const event = new EventModel(formData);

    const savedEvent = await event.save();
    success = true;
    resp.send({ success, savedEvent });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! getAllEvent (for particular user) --> auth-token required
exports.getAllEvent = async (req, resp) => {
  let success = false;

  // getting userId
  const userId = req.user.id;
  if (userId == "") {
    return resp.status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }

  if(userId !== req.params.userId){
    return resp.status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }

  try {
    // const Event = await EventModel.find().sort({ createdAt: -1 });
    const events = await EventModel.find({ 'event_host': userId }).populate('event_host').sort({ createdAt: -1 });
    if (events == "") {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }
    success = true;
    resp.send({ success, events });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! softDelete  --> auth-token required
exports.softDelete = async (req, resp) => {
  let success = false;
  try {
    console.log("Soft delete called!");
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};
