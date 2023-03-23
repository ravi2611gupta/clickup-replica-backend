const router = require('express').Router();
const { body } = require("express-validator");
const CONSTANTS = require("../../Constants");

const TagController = require('../../controller/userController/TagController');

// middleware
const fetchUser = require("../../middleware/fetchUser");

router.post('/', fetchUser, [
    body("name", CONSTANTS.FIELD_VALIDATION.NAME_VALIDATION).isLength({ min: 2, }),
    body("color", CONSTANTS.FIELD_VALIDATION.COLOR_VALIDATION).isLength({ min: 2, }),
], TagController.addTag);

router.get('/', fetchUser, TagController.getTag);
router.put('/:id', fetchUser, TagController.updateTag);
router.delete('/:id', fetchUser, TagController.deleteTag);

module.exports = router;