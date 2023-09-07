const {check} = require('express-validator')
const User = require('../models/UserModel')
const ExpressError = require("../utils/ExpressError");

exports.checkingUser = [
    check('email')
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail({})
    .withMessage('Invalid email address')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new ExpressError('Email address already in use', 409);
      } else {
        return true;
      }
    }),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  check('passwordConfirm')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm your password')
    .custom((val, { req }) => {
      if (val === req.body.password) return true;
      else throw new ExpressError('Passwords do not match', 300);
    }),
  check('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters'),
]