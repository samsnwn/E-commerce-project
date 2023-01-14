const User = require("../models/UserModel");
const ExpressError = require("../ExpressError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration Controller
exports.registrationController = async (req, res, next) => {
  // Create new User instance
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    // Password hash is done between here by the UserSchema
    // Save user to DB
    const savedUser = await User.create(newUser);
    // Send response to frontend
    res.status(200).json(savedUser);
  } catch (err) {
    // error handling
    next(new ExpressError("Failed to register, please try again", 500));
  }
};

// Login Controller
exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // checks if email exists in DB
    const user = await User.findOne({ email });

    // If user does not exist or password is incorrect(done in UserSchema)
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new ExpressError("Email or password not valid", 401));
    }

    // Make password undefined for security purposes
    user.password = undefined;

    // If everything is ok, send token to client
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({ status: "success", accessToken, user });
  } catch (err) {
    next(new ExpressError("Email or password not valid", 500));
  }
};
