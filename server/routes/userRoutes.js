const router = require('express').Router()
const { protect, restrictTo } = require('../middleware/authMiddleware')
const { updateController, deleteController, getUserController, getAllUsersController, getUserStatsController, updateMe, deleteMe } = require('../controllers/userControllers')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')

// UPDATE
router.put('/update/:id', protect, restrictTo('admin', 'user'), verifyTokenAndAuthorization, updateController)

// UPDATE ME
router.patch('/updateMe', protect, updateMe)

// DELETE
router.delete('/delete/:id', protect, restrictTo('admin', 'user'), verifyTokenAndAuthorization, deleteController)

// DELETE ME
router.delete('/deleteMe', protect, deleteMe)

// GET USER
router.get('/findById/:id', protect, restrictTo('admin'), verifyTokenAndAdmin, getUserController)

// GET ALL USERS
router.get('/findAll',protect, restrictTo('admin'), getAllUsersController)

// GET USER STATS
router.get('/stats', protect, restrictTo('admin'), verifyTokenAndAdmin, getUserStatsController)

module.exports = router