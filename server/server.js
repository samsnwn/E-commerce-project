const express = require("express");
const app = express();
require("dotenv").config();
const session = require('express-session');
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

// Route imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


// Connect to database
mongoose.connect(process.env.DB_LINK, (err) => {
  if (err) throw err;
  console.log("MongoDB is connected");
});

// Middleware
app.use(express.json())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))


// Routes
app.use('/auth', authRoutes)




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
