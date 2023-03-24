const router = require('express').Router();
const { body } = require("express-validator");
const CONSTANTS = require("../../Constants");

const AudienceController = require('../../controller/userController/AudienceController');

// middleware
const fetchUser = require("../../middleware/fetchUser");

router.get('/', fetchUser, AudienceController.getAudience); //! Query Parameters: (1): ?tag=tagId (not mandatory)
router.put('/:audienceId', fetchUser, AudienceController.updateAudienceTags);
router.get('/:audienceId', fetchUser, AudienceController.getSingleAudience);
router.delete('/:audienceId', fetchUser, AudienceController.updateAudienceTags);

module.exports = router;