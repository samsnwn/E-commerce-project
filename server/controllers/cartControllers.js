const Cart = require('../models/CartModel')
const ExpressError = require("../utils/ExpressError");


exports.createCartController = async (req, res, next) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        next(new ExpressError('Failed to create cart, Please Try Again', 500));
    }
}

exports.updateCartController = async (req, res, next) => {
    const cartId = req.params.id
    console.log(cartId)
    const updatedCartData = req.body
    try {
        const updatedCart = await Cart.findByIdAndUpdate(cartId, {
            $set: updatedCartData
        }, {new: true})
        res.status(200).json(updatedCart)
    } catch (err) {
        next(new ExpressError('Failed to update cart, Please Try Again', 500));
    }
}

exports.deleteCartController = async (req, res, next) => {
    const cartId = req.params.id
    try {
        await Cart.findByIdAndDelete(cartId)
        res.status(200).json('Cart has been deleted')
    } catch (err) {
        next(new ExpressError('Failed to delete your cart, try again please!', 500))
    }
}

exports.getUserCartController = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (err) {
        next(new ExpressError('Cannot find this product', 500))
    }
}

exports.getAllCartsController = async (req, res, next) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        next(new ExpressError('Failed to retrieve all carts, try again please!', 500))
    }
}
