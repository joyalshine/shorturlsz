const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        url : {
            type : String,
            required : true
        },
        protected : {
            type  :Boolean,
            required : true
        },
        password : {
            type : String
        },
        message: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Message",
                default: []
            }
        ],
    },
    { timestamps: true }
)


const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
