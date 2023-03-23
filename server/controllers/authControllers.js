const User = require("../models/UserModel");
const Cart = require("../models/CartModel");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");



const signToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const accessToken = signToken(user._id, user.isAdmin);

  const cookieOptions = { 
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    SameSite: "none",
  }

  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie("jwt", accessToken, cookieOptions);
  
// Remove password from the output
  user.password = undefined;

  res
    .status(statusCode)
    .json({ status: "success", accessToken, data: { user } });
};

// Registration Controller
exports.registrationController = async (req, res, next) => {
  // Create new User instance
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email
  });

  try {
    // Password hash is done between here by the UserSchema
    // Save user to DB
    const savedUser = await User.create(newUser);

    // Make password undefined for security purposes
    savedUser.password = undefined;

    // Create token with user id and isAdmin as payload
    createSendToken(savedUser, 201, res);
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
    const user = await User.findOne({ email }).select("+password");

    // If user does not exist or password is incorrect(done in UserSchema)
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new ExpressError("Email or password not valid", 401));
    }

    // Make password undefined for security purposes
    user.password = undefined;

    // If everything is ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    next(new ExpressError("Email or password not valid", 500));
  }
};

exports.protect = async (req, res, next) => {
  let token;
  // 1) Getting token and check if exists

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ExpressError("You are not logged in.Please log in to get access", 401)
    );
  }

  try {
    //  2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ExpressError("The user does not longer exist!", 401));
      // 4) Check if user changed password after token was issued
    } else if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new ExpressError(
          "User recently changed password. Please login again",
          401
        )
      );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    err.name === "TokenExpiredError"
      ? next(new ExpressError("Token expired!. Please log in again", 401))
      : next(new ExpressError("Invalid token!", 401));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ExpressError(
          "You do not have permission to perform this action!",
          403
        )
      );
    }
    next();
  };
};

// Forgot Password Controller
exports.forgotPassword = catchAsync(async (req, res, next) => {
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
    res.status(200).json({ status: "success", message: "Token sent to email", 
    resetToken: resetToken });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ExpressError("There was an error sending the email ", 500));
  }
});

// Reset Password controller
exports.resetPassword = catchAsync(async (req, res, next) => {
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
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  const {currentPassword ,newPassword, newPasswordConfirm } = req.body;

  // 2) Check if posted password is correct
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new ExpressError("Password is incorrect", 401));
  }

  if(newPassword !== newPasswordConfirm) {
    return next(new ExpressError("Passwords do not match", 401));
  }

  // 3) Update the password
  user.password = newPassword
  user.passwordConfirm = newPasswordConfirm
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
