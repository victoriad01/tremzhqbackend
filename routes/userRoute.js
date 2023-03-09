// Requiring product controller
const userController = require('../controllers/usercontroller')

// Requiring router from express
const router = require('express').Router()

// 1. Add a User route
router.post('/adduser', userController.uploadUserImage, userController.addAUser)
// 2. Get all User route
router.get('/alluser', userController.getAllUser)
// 3. Get a User route
router.get('/auser/:id', userController.getAUser)

router.post('/auser/', userController.getAUserByEmail)
// 4. Edit a User route
router.put('/edit/:id', userController.editOneUser)
// 5. Delete a User route
router.delete('/delete/:id', userController.deleteAUser)
// 6. Get User with his product using user id
router.get('/upd/:id', userController.getUserWithProducts)

module.exports = router
