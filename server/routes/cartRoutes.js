const router = require('express').Router()
const { createCartController, updateCartController, deleteCartController, getUserCartController, getAllCartsController} = require('../controllers/cartControllers')

const {auth, verifyAdmin} = require('../middleware/auth')

// CREATE
router.post('/create', auth, createCartController )

// UPDATE
router.put('/update/:id', auth, updateCartController)

// DELETE
router.delete('/delete/:id', auth, deleteCartController)

// GET USER CART
router.get('/cart/:userId', auth, getUserCartController)

// GET ALL CARTS
router.get('/', auth, verifyAdmin, getAllCartsController)


module.exports = router