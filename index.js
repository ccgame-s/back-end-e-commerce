const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()
const { PORT } = process.env

app.use('/', require('./routes'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
