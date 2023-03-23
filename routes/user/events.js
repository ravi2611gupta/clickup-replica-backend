const express = require("express");
const router = express.Router();
const EventController = require("../../controller/userController/EventController");
const { body } = require("express-validator");
const CONSTANTS = require("../../Constants");

// middleware
const fetchUser = require("../../middleware/fetchUser");

router.post(
  "/",
  fetchUser,
  [
    body("event_name", CONSTANTS.FIELD_VALIDATION.NAME_VALIDATION).isLength({ min: 2, }),
    body("event_cover_image", CONSTANTS.FIELD_VALIDATION.IMAGE_VALIDATION).isLength({ min: 2,}),
    body("event_mode", CONSTANTS.FIELD_VALIDATION.EVENT_MODE_VALIDATION).isLength({ min: 2, }),
    body("event_type", CONSTANTS.FIELD_VALIDATION.EVENT_TYPE_VALIDATION).isLength({ min: 2, }),
  ],
  EventController.addEvent
);

router.get("/", fetchUser, EventController.getAllEvent);
router.get("/single-event/:id", fetchUser, EventController.getSingleEvent);
router.delete("/:id", fetchUser, EventController.deleteEvent);

router.put(
  "/:id",
  fetchUser,
  [
    body("event_name", CONSTANTS.FIELD_VALIDATION.NAME_VALIDATION).isLength({ min: 2, }),
    body("event_cover_image", CONSTANTS.FIELD_VALIDATION.IMAGE_VALIDATION).isLength({ min: 2,}),
    body("event_mode", CONSTANTS.FIELD_VALIDATION.EVENT_MODE_VALIDATION).isLength({ min: 2, }),
    body("event_type", CONSTANTS.FIELD_VALIDATION.EVENT_TYPE_VALIDATION).isLength({ min: 2, }),
  ],
  EventController.updateEvent
);

module.exports = router;
