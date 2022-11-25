const router = require('express').Router()
const {createProductController, updateProductController, deleteProductController, getProductController, getAllProductsController} = require('../controllers/productControllers')
const {auth, verifyAdmin} = require('../middleware/auth')

// CREATE
router.post('/create', auth, verifyAdmin, createProductController)

// UPDATE
router.put('/update/:id', auth, verifyAdmin, updateProductController)

// DELETE
router.delete('/delete/:id', auth, verifyAdmin, deleteProductController)

// GET PRODUCT
router.get('/product/:id', getProductController)

// GET ALL PRODUCTS
router.get('/', getAllProductsController)

module.exports = router