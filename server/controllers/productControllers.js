const Product = require('../models/ProductModel')
const ExpressError = require("../utils/ExpressError");
const { faker } = require('@faker-js/faker');

exports.createProductController = async (req, res, next) => {

    const fakeProduct = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.fashion(width = 640, height= 480, randomize = true),
        categories: ["jackets", "jeans", "shirts"],
        size: "S",
        color: faker.color.human(),
        price: faker.commerce.price(),
        priceId: "price_1MolBWJNdqxiOr5VRjXrvTGl"
    }

    const newProduct = new Product(fakeProduct)
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
    const productId = req.params.id
    console.log(productId)
    try {
        const product = await Product.findById(productId)
        console.log(product)
        res.status(200).json(product)
    } catch (err) {
        next(new ExpressError('Cannot find this product', 500))
    }
}

exports.getAllProductsController = async (req, res, next) => {
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