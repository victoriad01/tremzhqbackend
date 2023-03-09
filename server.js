require('dotenv').config()
const express = require('express')
// import express from 'express'
const cors = require('cors')

const app = express()

// const corOptions = {
//   origin: 'https://localhost:8081',
// }

// Middlewares
// app.use(cors(corOptions))
app.use(cors())

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// API Testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EM-Tracker' })
})

// Routers
// A. Product
const routerProduct = require('./routes/productRoutes')
app.use('/api/products', routerProduct)

// B. Product Part
const routerProductPart = require('./routes/productpartsRoutes')
app.use('/api/productpart', routerProductPart)

// C. User
const routerUser = require('./routes/userRoute')
app.use('/api/user', routerUser)

// Static Images folder
app.use('Images', express.static('./Images'))

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong!'
  return res.status(status).json({
    success: false,
    status,
    message,
  })
})

// Port
const PORT = process.env.PORT || 8080

// Server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
