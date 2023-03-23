require("dotenv").config();
const { validationResult } = require("express-validator");
const CONSTANTS = require("../../Constants");

const TagModel = require("../../model/TagModel");

// ! addTag --> auth-token required
exports.addTag = async (req, resp) => {
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
    const formData = { ...req.body, tag_created_by: userId };
    const tag = new TagModel(formData);
    const savedTag = await tag.save();

    success = true;
    resp.send({ success, tag: savedTag });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};

// ! getTag --> auth-token required
exports.getTag = async (req, resp) => {
  let success = false;

  // getting userId
  const userId = req.user.id;
  if (userId == "") {
    return resp
      .status(CONSTANTS.ERROR.UNAUTHORIZED_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.UNAUTHORIZED_ERROR_MESSAGE });
  }

  try {
    const tagList = await TagModel.find({
        tag_created_by: req.params.userId,
      }).sort({ createdAt: -1 });
      if (tagList == "") {
        return resp
          .status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE)
          .send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE });
      }
  
      success = true;
      resp.send({ success, tags: tagList });
  } catch (error) {
    resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
  }
};


// ! updateTag --> auth-token required
exports.updateTag = async (req, resp) => {
    let success = false;

      // if there are errors, return bad request and the error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(CONSTANTS.ERROR.ERROR_CODE)
      .json({ success, error: errors.array() });
  }

    try {
        
        const { name, color } = req.body;
        let newTagData = {};
        if(name){
            newTagData.name = name;
        }
        if(color){
            newTagData.color = color;
        }

        //  find the tag to be updated and update that
        const tag = await TagModel.findById(req.params.id);
        if (tag == null) {
          return resp.status(CONSTANTS.ERROR.NOT_FOUND_ERROR_CODE).send({ success, error: CONSTANTS.ERROR.NOT_FOUND_ERROR_MESSAGE});
        }
  
        const updatedTag = await TagModel.findByIdAndUpdate(
          req.params.id,
          { $set: newTagData },
          { new: true }
        );

        success = true;
        resp.send({ success, tag: updatedTag }); 
    } catch (error) {
        resp
      .status(CONSTANTS.ERROR.SERVER_ERROR_CODE)
      .send({ success, error: CONSTANTS.ERROR.ERROR_MESSAGE });
    }
}


// ! deleteTag --> auth-token required
exports.deleteTag = async (req, resp) => {
    let success = false;
  try {
    const tag = await TagModel.findByIdAndDelete(req.params.id);
    if (!tag) {
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
