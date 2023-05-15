const router = require('express').Router()
const { protect, restrictTo } = require('../middleware/authMiddleware')
const {createProductController, updateProductController, deleteProductController, getProductController, getAllProductsController} = require('../controllers/productControllers')
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')

// CREATE
router.post('/create', protect, restrictTo('admin'), verifyTokenAndAdmin, createProductController)

// UPDATE
router.put('/update/:id', protect, restrictTo('admin'), verifyTokenAndAdmin, updateProductController)

// DELETE
router.delete('/delete/:id', protect, restrictTo('admin'), verifyTokenAndAdmin, deleteProductController)

// GET PRODUCT
router.get('/product/:id', getProductController)

// GET ALL PRODUCTS
router.get('/', getAllProductsController)

module.exports = router