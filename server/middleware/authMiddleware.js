const User = require("../models/UserModel");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const ExpressError = require("../utils/ExpressError");


exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Getting token and check if exists
  let token;
  token = req.cookies.jwt;

  if (!token) {
    // throw new ExpressError("You are not logged in.Please log in to get access", 401); Same as below
    return next(new ExpressError("You are not logged in.Please log in to get access", 401));
  }

  try {
    //  2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id).select("-password");
    if (!currentUser) {
      throw new ExpressError("The user does not longer exist!", 401);
      // 4) Check if user changed password after token was issued
    } else if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new ExpressError("User recently changed password. Please login again", 401);
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    if(err.name === "TokenExpiredError") {
      throw new ExpressError("Token expired!. Please log in again", 401);
    } else {
      throw new ExpressError("Invalid token!", 401);
    }
  }
});

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

exports.admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
      return next(
        new ExpressError(
          "Not authorized as admin",
          403
        )
      );
  }
}
