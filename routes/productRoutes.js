// Requiring product controller
const productController = require('../controllers/productcontroller')

// Requiring router from express
const router = require('express').Router()

// 1. Add a product route
router.post(
  '/addproduct',
  productController.uploadProductImage,
  productController.addProduct
)
// 2. Get all product route
router.get('/allproduct', productController.getAllProducts)
// 3. Get a product route
router.get('/:id', productController.getOneProduct)
// 4. Edit a product route
router.put('/:id', productController.updateAProduct)
// 5. Delete a product route
router.delete('/:id', productController.deleteAProduct)
// 6. Get product along productparts route
router.get('/getproductparts', productController.getProductParts)

// 7. Get product along with productparts using product id route
router.get('/getproductparts/:id', productController.getProductParts)

module.exports = router
