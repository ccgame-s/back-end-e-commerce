const router = require('express').Router()
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createTime: Date,
  updateTime: Date
})
const userModel = mongoose.model('User', userSchema)

router.use((req, res, next) => {
  console.log('Connected to User API..')
  next()
})

router.post('/login', (req, res) => {
  return res.send('login leaw na')
})

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    if(!username || !password) {
      res.status(400)
      return res.send('Error bad request')
    }
    const user = await userModel.findOne({ username })
    if(user) {
      res.status(400)
      return res.send('Error duplicate username exists')
    }
    const newUser = {
      username,
      password,
      createTime: Date.now(),
      updateTime: Date.now()
    }
    userModel.create(newUser)
    return res.send({
      username,
      createTime: newUser.createTime
    })
  }
  catch(error) {
    return res.send(error)
  }
})

module.exports = router