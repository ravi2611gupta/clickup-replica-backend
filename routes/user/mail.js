const router = require('express').Router();
const MailTesterController = require('../../controller/userController/MailTesterController') 

router.get('/', MailTesterController.sendEmailByController)

module.exports = router;