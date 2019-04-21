const router = require('express').Router()
const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  createTime: Date,
  updateTime: Date
})
const productsModel = mongoose.model('Product', productsSchema)

router.use((req, res, next) => {
  console.log('Connected to Products API..')
  next()
})

router.get('/', async (req, res) => {
  try {
    const products = await productsModel.find({})
    res.send(products)
  }
  catch(error) {
    res.send(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body
    if(!name || !price) {
      res.status(400)
      res.send('Error Bad Request')
    }
    await productsModel.create({
      name,
      price,
      createTime: Date.now(),
      updateTime: Date.now()
    })
    res.send({
      name,
      price,
      createTime: Date.now(),
      updateTime: Date.now()
    })
  }
  catch(error) {
    res.send(error)
  }
})

module.exports = router
