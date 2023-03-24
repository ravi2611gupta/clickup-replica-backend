const router = require('express').Router();
const { body } = require("express-validator");
const CONSTANTS = require("../../Constants");

const AudienceController = require('../../controller/userController/AudienceController');

// middleware
const fetchUser = require("../../middleware/fetchUser");

router.get('/', fetchUser, AudienceController.getAudience);
router.put('/:audienceId', fetchUser, AudienceController.updateAudienceTags);

module.exports = router;