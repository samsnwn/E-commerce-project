const router = require('express').Router()
const { updateController, deleteController, getUserController, getAllUsersController, getUserStatsController } = require('../controllers/userControllers')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')

// UPDATE
router.put('/update/:id', verifyTokenAndAuthorization, updateController)

// DELETE
router.delete('/delete/:id', verifyTokenAndAuthorization, deleteController)

// GET USER
router.get('/findById/:id', verifyTokenAndAdmin, getUserController)

// GET ALL USERS
router.get('/findAll',verifyTokenAndAdmin, getAllUsersController)

// GET USER STATS
router.get('/stats', verifyTokenAndAdmin, getUserStatsController)

module.exports = router