require("dotenv").config();
const { validationResult } = require("express-validator");
const EventTypeModel = require("../../model/EventTypeModel");
const CONSTANTS = require("../../Constants");

// ! addEventType --> auth-token required
exports.addEventType = async (req, resp) => {
  let success = false;

  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(CONSTANTS.ERROR.ERROR_CODE)
      .json({ success, error: errors.array() });
  }

  try {
    //  destructuring of req.body
    const { name } = req.body;

    const eventType = new EventTypeModel({
      name,
    });
    const savedEventType = await eventType.save();
    success = true;
    resp.send({ success, savedEventType });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};

// ! getEventType --> auth-token required
exports.getEventType = async (req, resp) => {
  let success = false;
  try {
    const EventType = await EventTypeModel.find({ event_type_flag: true }).sort(
      { date: -1 }
    );
    if (EventType == "") {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }
    success = true;
    resp.send({ success, EventType });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};

// ! updateEventType --> auth-token required
exports.updateEventType = async (req, resp) => {
  let success = false;

  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(CONSTANTS.ERROR.ERROR_CODE)
      .json({ success, error: errors.array() });
  }

  try {
    const { name } = req.body;
      let newEventType = {};
      if (name) {
        newEventType.name = name;
      }

      //  find the eventType to be updated and update that
      const EventType = await EventTypeModel.findById(req.params.id);
      if (EventType == null) {
        return resp.status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE});
      }
      if (EventType.event_type_flag == false) {
        return resp.status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE});
      }

      const updatedEventType = await EventTypeModel.findByIdAndUpdate(
        req.params.id,
        { $set: newEventType },
        { new: true }
      );
      success = true;
      resp.send({ success, updatedEventType });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};



// ! softDeleteEventType --> auth-token required
exports.softDeleteEventType = async (req, resp) => {
  let success = false;

  try {
     //  find the blog to be updated and update that
     const EventType = await EventTypeModel.findById(req.params.id);
     if (EventType == null) {
       return resp.status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
      }
      if (EventType.event_type_flag == false) {
       return resp.status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
     }
 
     const deleteEventType = await EventTypeModel.findByIdAndUpdate(req.params.id, {
       $set: { event_type_flag: false },
     });
     success = true;
     resp.send({ success, message: CONSTANTS.SUCCESS.DELETE_SUCCESS_MESSAGE });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
}