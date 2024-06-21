const Server = require("socket.io").Server;
const http = require('http')
const express = require('express')

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["POST", "GET"]
    }
})

const chatIdSocketMap = {}

const getRecieverSocketIdList = (chatId) => {
    if(chatIdSocketMap[chatId]) return chatIdSocketMap[chatId]
    else return []
}

io.on('connection', (socket) => {
    console.log("A user Connected " + socket.id)
    const chatId = socket.handshake.query.chatId

    if (chatId) {
        if (chatIdSocketMap[chatId] == null || chatIdSocketMap[chatId] == undefined) {
            chatIdSocketMap[chatId] = []
        }
        chatIdSocketMap[chatId].push(socket.id)
    }
    io.emit("getOnlineUsers", chatIdSocketMap[chatId])

    socket.on('disconnect', () => {
        console.log("User disconnected " + socket.id)
        let newIds = chatIdSocketMap[chatId].filter(id => id !== socket.id);
        chatIdSocketMap[chatId] = newIds

        io.emit("getOnlineUsers", chatIdSocketMap[chatId])

    })
})

module.exports = { app, server, io, getRecieverSocketIdList}