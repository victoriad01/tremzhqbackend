const jwt = require('jsonwebtoken')
const db = require('../models')
const multer = require('multer')
// Thesame as import multer from 'multer'
const path = require('path')
// Thesame as import path from 'path'

// Require models
const User = db.users
const Product = db.products

// 1. Create or User
const addAUser = async (req, res, next) => {
  console.log(req.body)
  try {
    let info = {
      image: req.file.path,
      name: req.body.name,
      email: req.body.email,
    }
    const user = await User.create(info)
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

// 2. Get all Users
const getAllUser = async (req, res) => {
  const allUsers = await User.findAll({})
  res.status(200).send(allUsers)
}

// 3a. Get a User by id
const getAUser = async (req, res, next) => {
  try {
    let id = req.params.id
    const aUser = await User.findOne({ id: id })
    if (aUser) {
      res.status(200).send(aUser)
    } else {
      res.json({ error: "User doesn't exist!" })
    }
  } catch (error) {
    next(error)
  }
}

// 3b. Get a User by email
const getAUserByEmail = async (req, res, next) => {
  let { email } = req.body
  try {
    const aUser = await User.findOne({ where: { email: email } })
    if (!aUser) {
      res.json({ error: "User doesn't exist!" })
    } else {
      const accessToken = jwt.sign(
        { email: aUser.email, name: aUser.name },
        'testJWTEdition'
      )
      res.json({ aUser, accessToken })
    }
  } catch (error) {
    next(error)
  }
}

// 4. Get a Edit
const editOneUser = async (req, res) => {
  let id = req.params.id
  await User.update(req.body, { where: { id: id } })
  res.status(200).send('User has been Edited Successfully!')
}

// 5. Delete a User
const deleteAUser = async (req, res) => {
  let id = req.params.id
  await User.destroy({ where: { id: id } })
  res.status(200).send('User has been Deleted Successfully!')
}

// 6. User with their products using user id
const getUserWithProducts = async (req, res) => {
  const id = req.params.id
  const data = await User.findAll({
    include: [
      {
        model: Product,
        as: 'product',
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

const uploadUserImage = multer({
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
  addAUser,
  getAllUser,
  getAUser,
  getAUserByEmail,
  editOneUser,
  deleteAUser,
  getUserWithProducts,
  uploadUserImage,
}
