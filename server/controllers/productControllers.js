const Product = require('../models/ProductModel')
const ExpressError = require("../ExpressError");


exports.createProductController = async (req, res, next) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        next(new ExpressError('Failed to create product, Please Try Again', 500));
    }
}

exports.updateProductController = async (req, res, next) => {
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

exports.deleteProductController = async (req, res, next) => {
    const productId = req.params.id
    try {
        await Product.findByIdAndDelete(productId)
        res.status(200).json('Product has been deleted')
    } catch (err) {
        next(new ExpressError('Failed to delete this product, try again please!', 500))
    }
}

exports.getProductController = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        next(new ExpressError('Cannot find this product', 500))
    }
}

exports.getAllProductsController = async (req, res, next) => {
    const qNew = req.query.new
    const qCategory = req.query.category

    try {
        let products;

        if(qNew) {
            products = await Product.find().sort({createdAt: -1 }).limit(1)
        } else if(qCategory) {
            products = await Product.find({categories:{
                $in: [qCategory]
            }})
        } else {
            products = await Product.find()
        }

        res.status(200).json(products)
    } catch (err) {
        next(new ExpressError('Failed to retrieve all products, try again please!', 500))
    }
}