import express from 'express';
const router = express.Router();

import { protect, restrictTo } from'../middleware/authMiddleware.js'
import {createProductController, updateProductController, deleteProductController, getProductController, getAllProductsController} from'../controllers/productControllers.js'
import {verifyTokenAndAdmin} from'../middleware/verifyToken.js'

// CREATE
router.post('/create',protect,restrictTo('admin'), createProductController)

// UPDATE
router.put('/update/:id', protect, restrictTo('admin'), verifyTokenAndAdmin, updateProductController)

// DELETE
router.delete('/delete/:id', protect, restrictTo('admin'), verifyTokenAndAdmin, deleteProductController)

// GET PRODUCT
router.get('/:id', getProductController)

// GET ALL PRODUCTS
router.get('/', getAllProductsController)

export default router