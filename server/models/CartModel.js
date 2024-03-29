import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        title: {
          type: String,
          // required: true,
        },
        productId: {
          type: String,
          // required: true,
        },
        image: {
          type: String,
          // required: true,
        },
        price: {
          type: Number,
          // required: true,
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
