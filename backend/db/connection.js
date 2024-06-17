const mongoose = require('mongoose')

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection Successfull")
    }
    catch(e){
        console.log("Connection to DB Failed")
        console.log(e)
    }
}

module.exports = connectToDB;