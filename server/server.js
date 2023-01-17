const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');


// Route imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");



// Connect to database
mongoose.connect(process.env.DB_LINK, (err) => {
  if (err) throw err;
  console.log("MongoDB is connected");
});

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());


// Routes
app.use((req, res, next) => {
  // console.log(req.headers)
  next()
})
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
