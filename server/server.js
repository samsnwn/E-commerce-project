const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const {notFound} = require("./middleware/errorMiddleware.js")
const {errorHandler} = require("./middleware/errorMiddleware.js")
const {connectDB} = require("./config/db.js")



// ***** MIDDLEWARE *****

// Set Security Http Headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} 

// Limit Request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour' 
})
app.use('/', limiter)

app.use(express.json())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'new',
      'category'
    ]
  })
);

// Serving static files
// app.use(express.static(`${__dirname}/public`));

app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// Route imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const contactRoute = require("./routes/contactRoute");

// Connect to database
connectDB()


// Routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/stripe', stripeRoutes)
app.use('/contact', contactRoute)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
