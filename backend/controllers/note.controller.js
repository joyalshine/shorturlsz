const bcrypt = require("bcryptjs")
const { getRecieverSocketIdList, io } = require("../socket/socket")
const Note = require("../models/note.model")


module.exports = {
    URLVerificationController: async (req, res) => {
        console.log("verification")
        const { URL } = req.body
        const note = await Note.findOne({
            url: URL
        })
        if (!note) res.send({ verified: true })
        else res.send({ verified: false })
    },

    CreateNewNoteController: async (req, res) => {
        try {
            console.log("creating")
            console.log(req.body)
            const { customURL, protected, data } = req.body;
            let newLinkData = {}
            if (customURL) newLinkData["url"] = req.body.url
            else {
                while (true) {
                    let randomURL = generateRandomString(process.env.URL_LENGTH);
                    const note = await Note.findOne({
                        url: randomURL
                    })
                    if (!note) {
                        newLinkData["url"] = randomURL;
                        break
                    }
                }
            }
            newLinkData["protected"] = protected
            if (protected) {
                const salt = await bcrypt.genSalt(10)
                const hashedPass = await bcrypt.hash(req.body.password, salt)
                newLinkData["password"] = hashedPass
            }

            newLinkData["data"] = data
            const response = await Note.create(newLinkData);
            res.status(201).send({ url: response.url, status: true })
        }
        catch (e) {
            console.log("Error occured at Link Controller - CreateNewLinkController :" + e)
            res.status(500).json({ error: "Internal Error Occured", status: false })
        }
    },

    fetchNoteData: async (req, res) => {
        const { noteId } = req.body
        const noteData = await Note.findOne({
            url: noteId
        })
        if (noteData) {
            if (noteData.protected) {
                res.status(201).json({ status: true, protected: true })
            }
            else {
                const data = noteData.data
                res.status(201).send({ status: true, protected: false, data })
            }
        }
        else res.send({ status: false })
    },

    fetchProtectedNote: async (req, res) => {
        const { noteId, password } = req.body
        const noteData = await Note.findOne({
            url: noteId
        })
        if (noteData) {
            if (noteData.protected) {
                const authenticationStatus = await bcrypt.compare(password, noteData.password)
                if (authenticationStatus) {
                    const data = noteData.data
                    res.status(201).send({ status: true, data })
                }
                else {
                    res.status(201).json({ status: false })
                }
            }
            else {
                res.status(201).send({ status: false })
            }
        }
        else res.send({ status: false })
    },
}

const generateRandomString = length => Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');