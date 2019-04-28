const router = require('express').Router()
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

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
    return res.send(products)
  }
  catch(error) {
    return res.send(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if(!ObjectId.isValid(id)) {
      res.status(400)
      return res.send('Error id is invalid')
    }
    const _id = new ObjectId(id)
    const product = await productsModel.findOne({ _id })
    if(product) {
      return res.send(product)
    }
    res.status(404)
    return res.send('Error not found')
  }
  catch(error) {
    return res.send(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body
    if(!name || !price) {
      res.status(400)
      return res.send('Error bad request')
    }
    const products = await productsModel.find({ name })
    if(products.length) {
      res.status(400)
      return res.send('Error duplicate name exists')
    }
    const product = {
      name,
      price,
      createTime: Date.now(),
      updateTime: Date.now()
    }
    productsModel.create(product)
    return res.send(product)
  }
  catch(error) {
    return res.send(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if(!ObjectId.isValid(id)) {
      res.status(400)
      return res.send('Error id is invalid')
    }
    const _id = new ObjectId(id)
    const result = await productsModel.deleteOne({ _id })
    if(result.n) {
      return res.send({
        _id,
        deletedCount: result.n
      })
    }
    res.status(404)
    return res.send('Error not found')
  }
  catch(error) {
    return res.send(error)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, price } = req.body
    if(!ObjectId.isValid(id)) {
      res.status(400)
      return res.send('Error id is invalid')
    }
    if(name) {
      const products = await productsModel.find({ name })
      if(products.length) {
        res.status(400)
        return res.send('Error duplicate name exists')
      }
    }
    const _id = new ObjectId(id)
    const product = await productsModel.findOne({ _id })
    if(product) {
      product.name = name || product.name
      product.price = price || product.price
      product.updateTime = Date.now()
    }
    product.save()
    return res.send(product)
  }
  catch(error) {
    return res.send(error)
  }
})

module.exports = router
