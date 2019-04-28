const router = require('express').Router()
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: Number,
  createTime: Date,
  updateTime: Date
})
const userModel = mongoose.model('User', userSchema)

router.use((req, res, next) => {
  console.log('Connected to User API..')
  next()
})

router.post('/login', (req, res) => {
  res.send('login leaw na')
})

router.post('/register', (req, res) => {
  res.send('register leaw na')
})

module.exports = router
