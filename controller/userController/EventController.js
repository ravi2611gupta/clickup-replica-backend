require("dotenv").config();
const { validationResult } = require("express-validator");
const EventModel = require("../../model/EventModel");
const CONSTANTS = require("../../Constants");

// ! addEvent --> auth-token required
exports.addEvent = async (req, resp) => {
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
      const { name, cover_image, event_type, event_host, event_access_approval } = req.body;
    
        const event = new EventModel({
          name, cover_image, event_type, event_host, event_access_approval
        });
        
        const savedEvent = await event.save();
        success = true;
        resp.send({ success, savedEvent });
      } catch (error) {
        resp
          .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
          .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
      }
  
}


// ! getAllEvent --> auth-token required
exports.getAllEvent = async (req, resp) => {
    let success = false;
    try {
        const Event = await EventModel.find().sort(
          { createdAt: -1 }
        );
        if (Event == "") {
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
}