const Chat = require("../models/chat.model")
const bcrypt = require("bcryptjs")
const Message = require("../models/message.model")
const { getRecieverSocketIdList, io } = require("../socket/socket")


module.exports = {
    URLVerificationController: async (req, res) => {
        const { URL } = req.body
        const conversation = await Chat.findOne({
            url: URL
        })
        if (!conversation) res.send({ verified: true })
        else res.send({ verified: false })
    },

    CreateNewChatController: async (req, res) => {
        try {
            console.log(req.body)
            const { customURL, protected } = req.body;
            let newChatData = {}
            if (customURL) newChatData["url"] = req.body.url
            else {
                while (true) {
                    let randomURL = generateRandomString(process.env.URL_LENGTH);
                    const conversation = await Chat.findOne({
                        url: randomURL
                    })
                    if (!conversation) {
                        newChatData["url"] = randomURL;
                        break
                    }
                }
            }
            newChatData["protected"] = protected
            if (protected) {
                const salt = await bcrypt.genSalt(10)
                const hashedPass = await bcrypt.hash(req.body.password, salt)
                newChatData["password"] = hashedPass
            }

            const response = await Chat.create(newChatData);
            res.status(201).send({ url: response.url, status: true })
        }
        catch (e) {
            console.log("Error occured at Chat Controller - CreateNewChatController :" + e)
            res.status(500).json({ error: "Internal Error Occured", status: false })
        }
    },

    fetchChatData: async (req, res) => {
        const { chatId } = req.body
        const conversation = await Chat.findOne({
            url: chatId
        }).populate('message')
        if (conversation) {
            if (conversation.protected) {
                res.status(201).json({ status: true, protected: true })
            }
            else {
                const messageHistory = await Chat.findOne({
                    url: chatId
                }).populate('message')
                res.status(201).send({ status: true, protected: false, message: messageHistory.message })
            }
        }
        else res.send({ status: false })
    },

    fetchProtectedChat: async (req, res) => {
        const { chatId, password } = req.body
        const conversation = await Chat.findOne({
            url: chatId
        })
        if (conversation) {
            if (conversation.protected) {
                const authenticationStatus = await bcrypt.compare(password, conversation.password)
                if (authenticationStatus) {
                    const messageHistory = await Chat.findOne({
                        url: chatId
                    }).populate('message')
                    res.status(201).send({ status: true, message: messageHistory.message })
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
    sendNewMessage: async (req, res) => {
        const { chatId, userId: senderId, message } = req.body
        console.log(req.body)
        const conversation = await Chat.findOne({
            url: chatId
        })
        if (conversation) {
            const newMessage = new Message({
                senderId,
                message
            })
            if (newMessage) {
                conversation.message.push(newMessage._id)
            }

            await Promise.all([conversation.save(), newMessage.save()])

            const socketIdList = getRecieverSocketIdList(chatId)
            socketIdList.forEach((id) => {
                io.to(id).emit("newMessage", newMessage);
            });

            res.status(201).send({ status: true })
        }
        else res.send({ status: false })
    },
}

const generateRandomString = length => Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');

