const sendEmail = require('../utils/email')

const router = require('express').Router()


router.post('/', async (req, res) => {
  const {name, email, message} = req.body
  const mailOptions = {
    from: email,
    to: "samuel.c.glantz@gmail.com",
    subject: "Welcome",
    text: message
  }
  await sendEmail(mailOptions)
})


module.exports = router