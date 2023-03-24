require("dotenv").config();
const { validationResult } = require("express-validator");
const GuestModel = require("../../model/GuestModel");
const CONSTANTS = require("../../Constants");
const AudienceModel = require("../../model/AudienceModel");

// ! addGuest --> auth-token required
exports.addGuest = async (req, resp) => {
  let success = false;

  // getting userId
  const userId = req.user.id;
  if (userId == "") {
    return resp
      .status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }

  // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(CONSTANTS.ERROR.ERROR_CODE)
      .json({ success, error: errors.array() });
  }

  try {
    const checkUserExistence = await GuestModel.find({
      $and: [{ user: userId }, { event: req.body.event }],
    });
    
    const checkAudienceExistence = await AudienceModel.find({user: userId});

    // const checkAudienceExistence = await AudienceModel.find({
    //   $and: [{ user: userId }, { event: { $in: [req.body.event] } }],
    // });


    if (checkUserExistence.length !== 0) {
      return resp
        .status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE)
        .send({ success, message: CONSTANTS.ERROR.USER_EXIST_ERROR_MESSAGE });
    }

    
    // adding data in guest
    const formData = { ...req.body, user: userId };
    const guest = new GuestModel(formData);
    const savedGuest = await guest.save();
    
    let savedAudience = {};
    const { event } = req.body;

    if(checkAudienceExistence.length === 0){
        // add
        const newFormDataForAdd = {user: userId, events: [event]};    
        const audience = new AudienceModel(newFormDataForAdd);
        savedAudience = await audience.save(event);
    }else{
        // update
        const newEvents = checkAudienceExistence[0]['events'].map((objId) => {
            return objId.toString();
        })
        savedAudience = await AudienceModel.findByIdAndUpdate(
            checkAudienceExistence[0]['_id'].toString(),
            { $set: {events: [...newEvents, event]} },
            { new: true }
          );
    }

    success = true;
    resp.send({ success, guest: savedGuest, audience: savedAudience  });
  } catch (error) {
    console.log("Error", error);
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};

// ! listOfGuest --> auth-token required
exports.listOfGuest = async (req, resp) => {
  let success = false;

  try {
    const GuestListOfEvent = await GuestModel.find({
      event: req.params.eventId,
    })
      .populate("user", "-password")
      .populate("event")
      .sort({ createdAt: -1 });
    if (GuestListOfEvent == "") {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }

    success = true;
    resp.send({ success, guests: GuestListOfEvent });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};

// ! updateGuest --> auth-token required
exports.updateGuest = async (req, resp) => {
  let success = false;

  try {
    const guest = await GuestModel.findById(req.params.guestId);
    if (!guest) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }

    const { approval } = req.body;
    const newFormData = {};
    if(approval){
        newFormData.approval = approval
    }

    const updatedGuest = await GuestModel.findByIdAndUpdate(
      req.params.guestId,
      { $set: {newFormData} },
      { new: true }
    );

    success = true;
    resp.send({ success, guest: updatedGuest });

  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! deleteGuest --> auth-token required
exports.deleteGuest = async (req, resp) => {
    let success = false;
  try {
    const guest = await GuestModel.findByIdAndDelete(req.params.guestId);
    if (!guest) {
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
}




