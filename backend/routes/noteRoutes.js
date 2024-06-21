const express = require("express")
const router = express.Router();
const controller =  require('../controllers/note.controller')

router.post('/verifyURL',controller.URLVerificationController)
router.post('/createNewNote',controller.CreateNewNoteController)
router.post('/fetchNoteData',controller.fetchNoteData)
router.post('/fetchProtectedNote',controller.fetchProtectedNote)

module.exports = router;