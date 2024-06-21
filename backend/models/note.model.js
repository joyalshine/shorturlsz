const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
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
        data : {
            type : String,
            required : true
        },
    },
    { timestamps: true }
)


const Note = mongoose.model("Note", noteSchema);
module.exports = Note;