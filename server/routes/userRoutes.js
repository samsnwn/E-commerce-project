
import express from 'express';
const router = express.Router();

import { protect, restrictTo, admin } from '../middleware/authMiddleware.js';

import {
  updateController,
  deleteController,
  getUserController,
  getAllUsersController,
  getUserStatsController,
  updateMe,
  deleteMe,
  getUserProfileController,
  updateUserProfileController,
} from '../controllers/userControllers.js';

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middleware/verifyToken.js';


// GET USER PROFILE
router.get('/profile', protect, getUserProfileController)

router.put('/update', protect, updateUserProfileController)

// UPDATE
// router.put('/update/:id', protect, restrictTo('admin'),admin, verifyTokenAndAdmin, updateController)

// UPDATE ME
router.put('/updateMe',protect, updateMe)

// DELETE
router.delete('/delete/:id', protect, restrictTo('admin'), admin, verifyTokenAndAdmin, deleteController)

// DELETE ME
router.delete('/deleteMe', protect,verifyToken, deleteMe)

// GET USER
router.get('/findById/:id', protect, restrictTo('admin'),admin, verifyTokenAndAdmin, getUserController)

// GET ALL USERS
router.get('/findAll',protect, restrictTo('admin'),admin, getAllUsersController)

// GET USER STATS
router.get('/stats', protect, restrictTo('admin'),admin, verifyTokenAndAdmin, getUserStatsController)

export default router