import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
