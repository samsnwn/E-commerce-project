const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: 'PENDING'
    }
}, {timestamps:true})

module.exports = mongoose.model('Order', OrderSchema)