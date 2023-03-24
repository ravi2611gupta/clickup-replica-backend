require("dotenv").config();
const CONSTANTS = require("../../Constants");

const AudienceModel = require("../../model/AudienceModel");

// ! getAudience --> auth-token required
exports.getAudience = async (req, resp) => {
  let success = false;

  // getting userId
  const userId = req.user.id;
  if (userId == "") {
    return resp
      .status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }

  let tagId = req.query.tag ? req.query.tag : null;

  try {
    let audienceList = {};
    if(tagId){
      audienceList = await AudienceModel.find({ $and: [{host: userId}, { tags: { $in: [tagId] } }] })
      .populate("host", "-password")
      .populate("user")
      .populate({ path: "guests", populate: "event" })
      .populate("tags")
      .sort({ createdAt: -1 });
    }else{
      audienceList = await AudienceModel.find({host: userId})
      .populate("host", "-password")
      .populate("user")
      .populate({ path: "guests", populate: "event" })
      .populate("tags")
      .sort({ createdAt: -1 });
    }
   
    if (audienceList == "") {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }

    success = true;
    resp.send({ success, audience: audienceList });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! getSingleAudience --> auth-token required
exports.getSingleAudience = async (req, resp) => {
  let success = false;

  try {
    const audience = await AudienceModel.findById(req.params.audienceId)
      .populate("host", "-password")
      .populate("user")
      .populate({ path: "guests", populate: "event" })
      .populate("tags")
      .sort({ createdAt: -1 });
    if (!audience) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }

    success = true;
    resp.send({ success, audience });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! updateAudienceTags --> auth-token required
exports.updateAudienceTags = async (req, resp) => {
  let success = false;

  try {
    const audience = await AudienceModel.findById(req.params.audienceId);
    if (!audience) {
      return resp
        .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
        .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
    }

    const { tags } = req.body;

    const updatedAudience = await AudienceModel.findByIdAndUpdate(
      req.params.audienceId,
      { $set: { tags: tags } },
      { new: true }
    );

    success = true;
    resp.send({ success, guest: updatedAudience });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! deleteAudience --> auth-token required
exports.deleteAudience = async (req, resp) => {
  let success = false;
  try {
    const audience = await AudienceModel.findByIdAndDelete(req.params.audienceId);
    if (!audience) {
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