import Product from '../models/ProductModel.js';
import ExpressError from "../utils/ExpressError.js";

export async function createProductController(req, res, next) {

    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        next(new ExpressError('Failed to create product, Please Try Again', 500));
    }
}

export async function updateProductController(req, res, next) {
    const productId = req.params.id
    const updatedProductData = req.body
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            $set: updatedProductData
        }, {new: true})
        res.status(200).json(updatedProduct)
    } catch (err) {
        next(new ExpressError('Failed to update product, Please Try Again', 500));
    }
}

export async function deleteProductController(req, res, next) {
    const productId = req.params.id
    try {
        await Product.findByIdAndDelete(productId)
        res.status(200).json('Product has been deleted')
    } catch (err) {
        next(new ExpressError('Failed to delete this product, try again please!', 500))
    }
}

export async function getProductController(req, res, next) {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (err) {
        next(new ExpressError('Cannot find this product', 500))
    }
}

export async function getAllProductsController(req, res, next) {
    const queryNew = req.query.new
    const queryCategory = req.query.category

    try {
        let products;

        if(queryNew) {
            products = await Product.find().sort({createdAt: -1 }).limit(1)
        } else if(queryCategory) {
            products = await Product.find({categories:{
                $in: [queryCategory]
            }})
        } else {
            products = await Product.find()
        }

        res.status(200).json({nbHits: products.length, products})
    } catch (err) {
        next(new ExpressError('Failed to retrieve all products, try again please!', 500))
    }
}