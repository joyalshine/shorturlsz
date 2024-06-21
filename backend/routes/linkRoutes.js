const express = require("express")
const router = express.Router();
const controller = require('../controllers/link.controller')

router.post('/verifyURL',controller.URLVerificationController)
router.post('/createNewLink',controller.CreateNewLinkController)
router.post('/fetchLinkData',controller.fetchLinkData)
router.post('/fetchProtectedLink',controller.fetchProtectedLink)

module.exports = router;