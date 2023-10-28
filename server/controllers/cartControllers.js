import Cart from '../models/CartModel.js';
import ExpressError from "../utils/ExpressError.js";


export async function createCartController(req, res, next) {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        next(new ExpressError('Failed to create cart, Please Try Again', 500));
    }
}

export async function updateCartController(req, res, next) {
    const cartId = req.params.id
    const updatedCartData = req.body
    try {
        const updatedCart = await findByIdAndUpdate(cartId, {
            $set: updatedCartData
        }, {new: true})
        res.status(200).json(updatedCart)
    } catch (err) {
        next(new ExpressError('Failed to update cart, Please Try Again', 500));
    }
}

export async function deleteCartController(req, res, next) {
    const cartId = req.params.id
    try {
        await findByIdAndDelete(cartId)
        res.status(200).json('Cart has been deleted')
    } catch (err) {
        next(new ExpressError('Failed to delete your cart, try again please!', 500))
    }
}

export async function getUserCartController(req, res, next) {
    try {
        const cart = await findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (err) {
        next(new ExpressError('Cannot find this product', 500))
    }
}

export async function getAllCartsController(req, res, next) {
    try {
        const carts = await find()
        res.status(200).json(carts)
    } catch (err) {
        next(new ExpressError('Failed to retrieve all carts, try again please!', 500))
    }
}
