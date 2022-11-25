const Order = require('../models/OrderModel')
const ExpressError = require("../ExpressError");


exports.createOrderController = async (req, res, next) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        next(new ExpressError('Failed to create order, Please Try Again', 500));
    }
}

exports.updateOrderController = async (req, res, next) => {
    const orderId = req.params.id
    const updatedOrderData = req.body
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(orderId, {
            $set: updatedOrderData
        }, {new: true})
        res.status(200).json(updatedOrder)
    } catch (err) {
        next(new ExpressError('Failed to update order, Please Try Again', 500));
    }
}

exports.deleteOrderController = async (req, res, next) => {
    const orderId = req.params.id
    try {
        await Order.findByIdAndDelete(orderId)
        res.status(200).json('Order has been deleted')
    } catch (err) {
        next(new ExpressError('Failed to delete your order, try again please!', 500))
    }
}

exports.getUserOrderController = async (req, res, next) => {
    try {
        const orders = await Order.find({userId: req.params.userId})
        res.status(200).json(orders)
    } catch (err) {
        next(new ExpressError('Cannot find this order', 500))
    }
}

exports.getAllOrdersController = async (req, res, next) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        next(new ExpressError('Failed to retrieve all orders, try again please!', 500))
    }
}

exports.getIncomeController = async (req, res, next) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {$project: {month: {$month: "$createdAt"}, sales: "$amount"}},
            {$group: {_id: "$month", total:{$sum: "$sales"}}}
        ])
        res.status(200).json(income)
    } catch (err) {
        next(new ExpressError('Failed to retrieve monthly income, try again please!', 500))
    }
}
