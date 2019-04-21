const router = require('express').Router()

router.use((req, res, next) => {
  console.log('Connected to Products API..')
  next()
})

router.get('/', (req, res) => {
  res.send('get products')
})

module.exports = router
