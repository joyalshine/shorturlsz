const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema(
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
        destination : {
            type : String,
            required : true
        },
    },
    { timestamps: true }
)


const Link = mongoose.model("Link", linkSchema);
module.exports = Link;