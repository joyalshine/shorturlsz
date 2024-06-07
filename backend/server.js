const express = require('express')
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 5000;

const app = express()

app.get("/",(req,res) => {
    res.send("Hello Hi")
})

app.listen(PORT, () => {
    console.log(`Server listening at Port ${PORT}`)
})