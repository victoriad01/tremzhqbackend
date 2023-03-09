const db = require('../models')

const multer = require('multer')
// Thesame as import multer from 'multer'
const path = require('path')
// Thesame as import path from 'path'

// Create main model
const ProductPart = db.productparts

// 1. Create or Add a Product Part
const addProductPart = async (req, res) => {
  let info = {
    image: req.file.path,
    partName: req.body.partName,
    serviceInterval: req.body.serviceInterval,
    lastServicedDate: req.body.lastServicedDate,
    description: req.body.description,
    product_id: req.body.product_id,
  }
  const product = await ProductPart.create(info)
  res.status(200).send(product)
}

// 2. Get all Products part
const getAllProductsPart = async (req, res) => {
  let products = await ProductPart.findAll({})
  res.status(200).send(products)
}

// 3. Get A Product part
const getOneProductPart = async (req, res) => {
  let id = req.params.id
  let product = await ProductPart.findOne({ where: { id: id } })
  res.status(200).send(product)
}

// 4. Update a Product part
const updateAProductPart = async (req, res) => {
  let id = req.params.id
  await ProductPart.update(req.body, { where: { id: id } })
  res.status(200).send('Product Edited Successfully')
}

// 5. Delete a Product part
const deleteAProductPart = async (req, res) => {
  let id = req.params.id
  await ProductPart.destroy({ where: { id: id } })
  res.status(200).send('Product Deleted Successfully')
}

// 6. Upload Product Part Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const uploadProductPartImage = multer({
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
  addProductPart,
  getAllProductsPart,
  getOneProductPart,
  updateAProductPart,
  deleteAProductPart,

  uploadProductPartImage,
}
