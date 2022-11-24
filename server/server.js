const express = require('express');
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')

  // connect to database
  mongoose.connect(process.env.DB_LINK, err => {
    if (err) throw (err)
    console.log("MongoDB is connected")
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})