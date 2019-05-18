const router = require('express').Router()
const Cors = require('cors')

const auth = require('./auth')
const products = require('./products')

const requireJwt = require('../libs/jwt')

router.use(Cors())

router.use('/', auth)
router.use('/products', requireJwt, products)

module.exports = router
