import express from 'express';
const router = express.Router();
import { protect, restrictTo }  from '../middleware/authMiddleware.js'
import { createCartController, updateCartController, deleteCartController, getUserCartController, getAllCartsController}  from '../controllers/cartControllers.js'

import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middleware/verifyToken.js'

// CREATE
router.post('/create', protect, verifyToken, createCartController )

// UPDATE
router.put('/update/:cartId', protect, restrictTo('admin', 'user'), updateCartController)

// DELETE
router.delete('/delete/:id', protect, restrictTo('admin', 'user'), verifyTokenAndAuthorization, deleteCartController)

// GET USER CART
router.get('/user_cart/:userId', protect, restrictTo('admin', 'user'), verifyTokenAndAuthorization, getUserCartController)

// GET ALL CARTS
router.get('/', protect, restrictTo('admin'), verifyTokenAndAdmin, getAllCartsController)


export default router;