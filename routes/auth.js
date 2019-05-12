const router = require('express').Router()
const mongoose = require('mongoose')
const jwt = require('jwt-simple')

const { JWT_SECRET_KEY } = process.env

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createTime: Date,
  updateTime: Date
})
const userModel = mongoose.model('User', userSchema)

// router.use((req, res, next) => {
//   console.log('Connected to User API..')
//   next()
// })

router.post('/login', async (req, res) => {
  try {
    const { username, password, jwtToken } = req.body
    if(jwtToken) {
      const jwtDecoded = jwt.decode(jwtToken, JWT_SECRET_KEY)
      const now = Date.now()
      if(now - jwtDecoded.iat > 43200) { // 12 hours
        res.status(401)
        return res.send('Error token has expired')
      }
      const user = await userModel.findOne({ username: jwtDecoded.sub })
      if(!user) {
        res.status(401)
        return res.send('Error validating token')
      }
      return res.send({
        id: user._id,
        username: user.username,
        jwtToken
      })
    }
    const user = await userModel.findOne({ username, password })
    if(!user) {
      res.status(401)
      return res.send('Error username or password wrong')
    }
    const payload = {
      sub: username,
      iat: Date.now()
    }
    return res.send({
      id: user._id,
      username: user.username,
      jwtToken: jwt.encode(payload, JWT_SECRET_KEY)
    })
  }
  catch(error) {
    res.status(500)
    return res.send(error)
  }
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
    res.status(500)
    return res.send(error)
  }
})

module.exports = router
