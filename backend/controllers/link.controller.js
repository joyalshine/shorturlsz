const bcrypt = require("bcryptjs")
const { getRecieverSocketIdList, io } = require("../socket/socket")
const Link = require("../models/link.model")


module.exports = {
    URLVerificationController: async (req, res) => {
        console.log("verification")
        const { URL } = req.body
        const link = await Link.findOne({
            url: URL
        })
        if (!link) res.send({ verified: true })
        else res.send({ verified: false })
    },

    CreateNewLinkController: async (req, res) => {
        try {
            console.log("creating")
            console.log(req.body)
            const { customURL, protected, destination } = req.body;
            let newLinkData = {}
            if (customURL) newLinkData["url"] = req.body.url
            else {
                while (true) {
                    let randomURL = generateRandomString(process.env.URL_LENGTH);
                    const link = await Link.findOne({
                        url: randomURL
                    })
                    if (!link) {
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

            newLinkData["destination"] = destination
            const response = await Link.create(newLinkData);
            res.status(201).send({ url: response.url, status: true })
        }
        catch (e) {
            console.log("Error occured at Link Controller - CreateNewLinkController :" + e)
            res.status(500).json({ error: "Internal Error Occured", status: false })
        }
    },

    fetchLinkData: async (req, res) => {
        const { linkId } = req.body
        const linkData = await Link.findOne({
            url: linkId
        })
        if (linkData) {
            if (linkData.protected) {
                res.status(201).json({ status: true, protected: true })
            }
            else {
                const destination = linkData.destination
                res.status(201).send({ status: true, protected: false, destination })
            }
        }
        else res.send({ status: false })
    },

    fetchProtectedLink: async (req, res) => {
        const { linkId, password } = req.body
        const linkData = await Link.findOne({
            url: linkId
        })
        if (linkData) {
            if (linkData.protected) {
                const authenticationStatus = await bcrypt.compare(password, linkData.password)
                if (authenticationStatus) {
                    const destination = linkData.destination
                    res.status(201).send({ status: true, destination })
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

    // sendNewMessage: async (req, res) => {
    //     const { chatId, userId: senderId, message } = req.body
    //     console.log(req.body)
    //     const conversation = await Chat.findOne({
    //         url: chatId
    //     })
    //     if (conversation) {
    //         const newMessage = new Message({
    //             senderId,
    //             message
    //         })
    //         if (newMessage) {
    //             conversation.message.push(newMessage._id)
    //         }

    //         await Promise.all([conversation.save(), newMessage.save()])

    //         const socketIdList = getRecieverSocketIdList(chatId)
    //         socketIdList.forEach((id) => {
    //             io.to(id).emit("newMessage", newMessage);
    //         });

    //         res.status(201).send({ status: true })
    //     }
    //     else res.send({ status: false })
    // },
}

const generateRandomString = length => Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');