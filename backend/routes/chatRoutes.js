const express = require("express")
const router = express.Router()
const controller = require('../controllers/chat.controller')

router.post('/verifyURL',controller.URLVerificationController)
router.post('/createNewChat',controller.CreateNewChatController)
router.post('/fetchChatData',controller.fetchChatData)
router.post('/fetchProtectedChat',controller.fetchProtectedChat)
router.post('/sendNewMessage',controller.sendNewMessage)

module.exports = router;