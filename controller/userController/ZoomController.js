require("dotenv").config();
const { validationResult } = require("express-validator");
const ZoomModel = require("../../model/ZoomModel");
const CONSTANTS = require("../../Constants");


// ! addZoom --> auth-token required
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
      const { event, zoom_meeting_url, zoom_meeting_id, zoom_meeting_password } = req.body;
    
        const zoom = new ZoomModel({
            event, zoom_meeting_url, zoom_meeting_id, zoom_meeting_password
        });
        
        const savedZoom = await zoom.save();
        success = true;
        resp.send({ success, savedZoom });
      } catch (error) {
        resp
          .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
          .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
      }
  
}