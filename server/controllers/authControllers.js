const User = require("../models/UserModel");
const Cart = require("../models/CartModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const asyncHandler = require("express-async-handler");
const ExpressError = require("../utils/ExpressError");
const sendEmail = require("../utils/email");
const createSendToken = require("../utils/generateToken");

// Registration Controller
exports.registrationController = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ExpressError(`User already exists`, 404);
  }
  // Create new User instance
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  });

  // Password hash is done between here by the UserSchema

  // Save user to DB
  const savedUser = await User.create(newUser);

  if (savedUser) {
    // Make password undefined for security purposes
    savedUser.password = undefined;

    // Create token with user id and isAdmin as payload
    createSendToken(savedUser, 201, res);
  } else {
    throw new ExpressError("Invalid user data", 500);
  }
});

// Login Controller
exports.loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // checks if email exists in DB
  const user = await User.findOne({ email }).select("+password");

  // If user does not exist or password is incorrect(done in UserSchema)
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new ExpressError("Invalid email or password", 401);
  }

  // Make password undefined for security purposes
  user.password = undefined;

  // If everything is ok, send token to client
  createSendToken(user, 201, res);
});

// Forgot Password Controller
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //  1) Get user based on posted email+
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ExpressError("A user does not exist with this email", 404));
  }

  //  2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //  3) Send it to user email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/auth/resetPassword/${resetToken}`;

  const message = `Forgot your password? Please submit a PATCH request with your new password and PasswordConfirm to the ${resetUrl}.\nIf you didn't forget your password, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ExpressError("There was an error sending the email ", 500));
  }
});

// Reset Password controller
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) Set the new password only if token did not expire and there is user
  if (!user) {
    return next(new ExpressError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user(done in userSchema)

  // 4) Log user in, send JWT
  createSendToken(user, 201, res);
});

// Update Password controller
exports.updatePassword = asyncHandler(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  // 2) Check if posted password is correct
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new ExpressError("Password is incorrect", 401));
  }

  if (newPassword !== newPasswordConfirm) {
    return next(new ExpressError("Passwords do not match", 401));
  }

  // 3) Update the password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

// Logout controller
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
});
