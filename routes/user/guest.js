const router = require('express').Router();
const { body } = require("express-validator");
const CONSTANTS = require("../../Constants");

const GuestController = require('../../controller/userController/GuestController');

// middleware
const fetchUser = require("../../middleware/fetchUser");

router.post('/', fetchUser, [
    body("event", CONSTANTS.FIELD_VALIDATION.EVENT_VALIDATION).isLength({ min: 2, }),
], GuestController.addGuest);

router.get('/:eventId', fetchUser, GuestController.listOfGuest);
router.put('/:guestId', fetchUser, GuestController.updateGuest);
router.get('/:guestId', fetchUser, GuestController.getSingleGuest);
router.delete('/:guestId', fetchUser, GuestController.deleteGuest);

module.exports = router;