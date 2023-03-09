const db = require('../models')
// const { ProductPart } = require('./productpartscontroller')

const multer = require('multer')
// Thesame as import multer from 'multer'
const path = require('path')
// Thesame as import path from 'path'

// Create main model
const Product = db.products

const ProductPart = db.productparts

// 1. Create or Add a Product
const addProduct = async (req, res) => {
  let info = {
    image: req.file.path,
    title: req.body.title,
    model: req.body.model,
    year: req.body.year,
    desc: req.body.desc,
    user_id: req.body.user_id,
  }
  const product = await Product.create(info)
  res.status(200).send(product)
}

// 2. Get all Products
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({})
  // to get just some part of the table use the code on next line
  // let products = await Product.findAll({attributes:['title', 'year']})
  res.status(200).send(products)
}

// 3. Get A Product
const getOneProduct = async (req, res) => {
  let id = req.params.id
  let product = await Product.findOne({ where: { id: id } })
  res.status(200).send(product)
}

// 4. Update Product
const updateAProduct = async (req, res) => {
  let id = req.params.id
  await Product.update(req.body, { where: { id: id } })
  res.status(200).send('Product Edited Successfully')
}

// 5. Delete a Product
const deleteAProduct = async (req, res) => {
  let id = req.params.id
  await Product.destroy({ where: { id: id } })
  res.status(200).send('Product Deleted Successfully')
}

// 6. Connect one to many relation Product to Productparts

const getProductParts = async (req, res) => {
  const id = req.params.id
  const data = await Product.findAll({
    include: [
      {
        model: ProductPart,
        as: 'productpart',
      },
    ],
    where: { id: id },
  })
  res.status(200).send(data)
}

// 7. Upload Image Controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const uploadProductImage = multer({
  storage: storage,
  limits: {
    fileSize: '1000000',
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))
    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Upload file with the right extension')
  },
}).single('image')

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateAProduct,
  deleteAProduct,
  getProductParts,
  uploadProductImage,
}
