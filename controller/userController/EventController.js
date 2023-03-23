require("dotenv").config();
const { validationResult } = require("express-validator");
const EventModel = require("../../model/EventModel");
const CONSTANTS = require("../../Constants");

// ! addEvent --> auth-token required
exports.addEvent = async (req, resp) => {
  let success = false;

  // getting userId
  const userId = req.user.id;
  if (userId == "") {
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
    resp.send({ success,  event: savedEvent });
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

  try {
    const events = await EventModel.find({ 'event_host': userId }).populate('event_host', '-password').sort({ createdAt: -1 });
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
    // TODO ---->
    console.log("Soft delete called!");
  } catch (error) {
    resp
    .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
    .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! deleteEvent  --> auth-token required
exports.deleteEvent = async (req, resp) => {
  let success = false;
  try {
    const events = await EventModel.findByIdAndDelete(req.params.id);
    if (!events) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }
    success = true;
    resp.send({ success, message: CONSTANTS.SUCCESS.DELETE_SUCCESS_MESSAGE });
  
  } catch (error) {
    resp
    .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
    .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};



// ! updateEvent --> auth-token required
exports.updateEvent = async (req, resp) => {
  let success = false;
  
    // if there are errors, return bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp
        .status(CONSTANTS.ERROR.ERROR_CODE)
        .json({ success, error: errors.array() });
    }

    try {
      const formData = req.body;
      
      //  find the event to be updated and update that
      const event = await EventModel.findById(req.params.id);
      if (event == null) {
        return resp.status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE});
      }

      const updatedEvent = await EventModel.findByIdAndUpdate(
        req.params.id,
        { $set: formData },
        { new: true }
      );
      success = true;
      resp.send({ success, event: updatedEvent });
      
    } catch (error) {
      resp
    .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
    .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
    }
}


// ! getSingleEvent --> auth-token required
exports.getSingleEvent = async (req, resp) => {
  let success = false;
  try {
    const event = await EventModel.findById(req.params.id).populate('event_host', '-password');
    if (event == null) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }
    success = true;
    resp.send({ success, event });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};