const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

const { PORT } = process.env

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
