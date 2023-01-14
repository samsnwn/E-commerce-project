const router = require('express').Router()
const {createProductController, updateProductController, deleteProductController, getProductController, getAllProductsController} = require('../controllers/productControllers')
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')

// CREATE
router.post('/create', verifyTokenAndAdmin, createProductController)

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, updateProductController)

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, deleteProductController)

// GET PRODUCT
router.get('/product/:id', getProductController)

// GET ALL PRODUCTS
router.get('/', getAllProductsController)

module.exports = router