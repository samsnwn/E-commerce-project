const router = require('express').Router()
const { createOrderController, updateOrderController, deleteOrderController, getUserOrderController, getAllOrdersController, getIncomeController} = require('../controllers/orderControllers')

const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middleware/verifyToken')

// CREATE
router.post('/create', verifyToken, createOrderController )

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, updateOrderController)

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, deleteOrderController)

// GET USER ORDER
router.get('/order/:userId', verifyTokenAndAuthorization, getUserOrderController)

// GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, getAllOrdersController)

// GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, getIncomeController)


module.exports = router