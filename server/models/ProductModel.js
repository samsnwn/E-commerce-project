import  mongoose from 'mongoose'
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
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
        type: Array,
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
    },
    inStock: {
        type: Boolean,
        default: true
    },
    qty:{
        type: Number,
        default: 1
    },
    brand:{
        type: String,
    },
    rn: {
        type: String,
    },
    measures: {
        length: { type: Number, default: 54 },
        shoulders: { type: Number, default: 54 },
        sleeve: { type: Number, default: 54 },
        chest: { type: Number, default: 54 },
        weist: { type: Number, default: 54 },
    },
    quality: {
        type: String
    }
}, {timestamps:true})

const Product = mongoose.model('Product', ProductSchema) || mongoose.models.Product

export default Product;