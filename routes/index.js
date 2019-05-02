const router = require('express').Router()

const auth = require('./auth')
const products = require('./products')

const requireJwt = require('../libs/jwt')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.use('/', auth)
router.use('/products', requireJwt, products)

module.exports = router
