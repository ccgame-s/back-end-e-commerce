const router = require('express').Router()

const auth = require('./auth')
const products = require('./products')

router.use('/', auth)
router.use('/products', products)

module.exports = router
