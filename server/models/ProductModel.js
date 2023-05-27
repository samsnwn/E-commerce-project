const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    categories: {
        type: Array
    },
    size: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    priceId: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    qty:{
        type: Number,
        default: 1
    }
}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema)