const router = require('express').Router()
const { updateController, deleteController, getUserController, getAllUsersController, getUserStatsController } = require('../controllers/userControllers')
const {auth, verifyAdmin} = require('../middleware/auth')

// UPDATE
router.put('/update/:id', auth , updateController)

// DELETE
router.delete('/delete/:id', auth, deleteController)

// GET USER
router.get('/findById/:id', auth, verifyAdmin, getUserController)

// GET ALL USERS
router.get('/findAll', auth, verifyAdmin, getAllUsersController)

// GET USER STATS
router.get('/stats', auth, verifyAdmin, getUserStatsController)

module.exports = router