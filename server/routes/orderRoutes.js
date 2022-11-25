const router = require('express').Router()
const { createOrderController, updateOrderController, deleteOrderController, getUserOrderController, getAllOrdersController, getIncomeController} = require('../controllers/orderControllers')

const {auth, verifyAdmin} = require('../middleware/auth')

// CREATE
router.post('/create', auth, createOrderController )

// UPDATE
router.put('/update/:id', auth, verifyAdmin, updateOrderController)

// DELETE
router.delete('/delete/:id', auth, verifyAdmin, deleteOrderController)

// GET USER ORDER
router.get('/order/:userId', auth, verifyAdmin, getUserOrderController)

// GET ALL ORDERS
router.get('/', auth, verifyAdmin, getAllOrdersController)

// GET MONTHLY INCOME
router.get('/income', auth, verifyAdmin, getIncomeController)


module.exports = router