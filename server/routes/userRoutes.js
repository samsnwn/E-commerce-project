const router = require('express').Router()
const { protect, restrictTo } = require('../controllers/authControllers')
const { updateController, deleteController, getUserController, getAllUsersController, getUserStatsController } = require('../controllers/userControllers')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')

// UPDATE
router.put('/update/:id', protect, restrictTo('admin', 'user'), verifyTokenAndAuthorization, updateController)

// DELETE
router.delete('/delete/:id', protect, restrictTo('admin', 'user'), verifyTokenAndAuthorization, deleteController)

// GET USER
router.get('/findById/:id', protect, restrictTo('admin'), verifyTokenAndAdmin, getUserController)

// GET ALL USERS
router.get('/findAll',protect, restrictTo('admin'), verifyTokenAndAdmin, getAllUsersController)

// GET USER STATS
router.get('/stats', protect, restrictTo('admin'), verifyTokenAndAdmin, getUserStatsController)

module.exports = router