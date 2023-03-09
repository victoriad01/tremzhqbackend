// Requiring product controller
const productPartController = require('../controllers/productpartscontroller')

// Requiring router from express
const router = require('express').Router()

// 1. Add a product route
router.post(
  '/addproductpart',
  productPartController.uploadProductPartImage,
  productPartController.addProductPart
)
// 2. Get all product route
router.get('/allproductpart', productPartController.getAllProductsPart)
// 3. Get a product route
router.get('/:id', productPartController.getOneProductPart)
// 4. Edit a product route
router.put('/:id', productPartController.updateAProductPart)
// 5. Delete a product route
router.delete('/:id', productPartController.deleteAProductPart)

module.exports = router
