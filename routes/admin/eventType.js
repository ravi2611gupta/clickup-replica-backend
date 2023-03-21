const express = require("express");
const router = express.Router();
const EventTypeController = require("../../controller/adminController/EventTypeController");
const { body } = require("express-validator");
const CONSTANTS = require("../../Constants");

// middleware
const fetchAdmin = require("../../middleware/fetchAdmin");

router.post(
  "/",
  fetchAdmin,
  [body("name", CONSTANTS.FIELD_VALIDATION.NAME_VALIDATION).isLength({
    min: 2,
  })],
  EventTypeController.addEventType
);

router.get('/', fetchAdmin, EventTypeController.getEventType);

router.put(
    "/:id",
    fetchAdmin,
    [body("name", CONSTANTS.FIELD_VALIDATION.NAME_VALIDATION).isLength({
      min: 2,
    })],
    EventTypeController.updateEventType
  );

  router.put(
    "/delete/:id",
    fetchAdmin,
    EventTypeController.softDeleteEventType
  );

module.exports = router;
