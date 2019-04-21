const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./libs/db')

const app = express()
dotenv.config()
connectDB()
const { PORT } = process.env

app.use('/', require('./routes'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
