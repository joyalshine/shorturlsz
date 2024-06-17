const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors');
dotenv.config()
const PORT = process.env.PORT || 5000;

const app = express()

const connectToDB = require('./db/connection')

const chatRoutes = require('./routes/chatRoutes')
const linkRoutes = require('./routes/linkRoutes')
const noteRoutes = require('./routes/noteRoutes')


var corsOptions = {
    origin: true,
      credentials: true,
  }
  
app.use(express.json())
app.use(cors(corsOptions));


app.use("/chat",chatRoutes)
app.use("/link",linkRoutes)
app.use("/note",noteRoutes)

app.listen(PORT,async () => {
    connectToDB()
    console.log(`Server listening at Port ${PORT}`)
})