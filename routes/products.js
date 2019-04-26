const router = require('express').Router()
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

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

router.get('/:id', async (req, res) => {
  try {
    if(!ObjectId.isValid(req.params.id)) {
      res.status(400)
      res.send('Error id is invalid')
    }
    const _id = new ObjectId(req.params.id)
    const product = await productsModel.findOne({ _id })
    if(product) {
      res.send(product)
    }
    res.status(404)
    res.send('Error not found')
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
      res.send('Error bad request')
    }
    const products = await productsModel.find({ name })
    if(products.length) {
      res.status(400)
      res.send('Error duplicate name exists')
    }
    const product = {
      name,
      price,
      createTime: Date.now(),
      updateTime: Date.now()
    }
    productsModel.create(product)
    res.send(product)
  }
  catch(error) {
    res.send(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if(!ObjectId.isValid(id)) {
      res.status(400)
      res.send('Error id is invalid')
    }
    const _id = new ObjectId(id)
    const result = await productsModel.deleteOne({ _id })
    if(result.n) {
      res.send({
        _id,
        deletedCount: result.n
      })
    }
    res.status(404)
    res.send('Error not found')
  }
  catch(error) {
    res.send(error)
  }
})

module.exports = router
