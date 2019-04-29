const router = require('express').Router()

const auth = require('./auth')
const products = require('./products')

const requireJwt = require('../libs/jwt')

router.use('/', auth)
router.use('/products', requireJwt, products)

module.exports = router
