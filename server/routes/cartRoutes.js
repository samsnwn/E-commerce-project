const router = require('express').Router()
const { createCartController, updateCartController, deleteCartController, getUserCartController, getAllCartsController} = require('../controllers/cartControllers')

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')

// CREATE
router.post('/create', verifyToken, createCartController )

// UPDATE
router.put('/update/:id', verifyTokenAndAuthorization, updateCartController)

// DELETE
router.delete('/delete/:id', verifyTokenAndAuthorization, deleteCartController)

// GET USER CART
router.get('/cart/:userId', verifyTokenAndAuthorization, getUserCartController)

// GET ALL CARTS
router.get('/', verifyTokenAndAdmin, getAllCartsController)


module.exports = router